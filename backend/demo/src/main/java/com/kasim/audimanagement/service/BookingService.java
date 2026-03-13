package com.kasim.audimanagement.service;

import com.kasim.audimanagement.dto.BookingRequest;
import com.kasim.audimanagement.dto.BookingResponse;
import com.kasim.audimanagement.dto.ReviewRequest;
import com.kasim.audimanagement.entity.Booking;
import com.kasim.audimanagement.entity.Booking.BookingStatus;
import com.kasim.audimanagement.entity.User;
import com.kasim.audimanagement.exception.BadRequestException;
import com.kasim.audimanagement.repository.BookingRepository;
import com.kasim.audimanagement.repository.UserRepository;
import com.kasim.audimanagement.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    // ==================== FACULTY OPERATIONS ====================

    /**
     * Faculty submits a new booking request
     */
    @Transactional
    public BookingResponse submitBooking(BookingRequest request) {
        User faculty = getCurrentUser();

        LocalDate startDate = LocalDate.parse(request.getEventStartDate());
        LocalDate endDate = request.getEventEndDate() != null && !request.getEventEndDate().isBlank()
                ? LocalDate.parse(request.getEventEndDate()) : startDate;
        LocalTime startTime = LocalTime.parse(request.getStartTime());
        LocalTime endTime = LocalTime.parse(request.getEndTime());

        // Validate date is in the future
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("Event date must be in the future");
        }

        // Validate end date is not before start date
        if (endDate.isBefore(startDate)) {
            throw new BadRequestException("End date cannot be before start date");
        }

        // Validate end time is after start time
        if (!endTime.isAfter(startTime)) {
            throw new BadRequestException("End time must be after start time");
        }

        Booking booking = Booking.builder()
                .eventType(request.getEventType())
                .eventTitle(request.getEventTitle())
                .venue(request.getVenue())
                .eventStartDate(startDate)
                .eventEndDate(endDate)
                .startTime(startTime)
                .endTime(endTime)
                .expectedAttendees(request.getExpectedAttendees())
                .eventPurpose(request.getEventPurpose())
                .seatingArrangement(request.getSeatingArrangement())
                .seatingCapacity(request.getSeatingCapacity())
                .stageRequirement(request.getStageRequirement())
                .technicalEquipment(mapToCommaSeparated(request.getTechnicalEquipment()))
                .additionalServices(mapToCommaSeparated(request.getAdditionalServices()))
                .specialRequirements(request.getSpecialRequirements())
                .priority(request.getPriority() != null ? request.getPriority() : "normal")
                .specialInstructions(request.getSpecialInstructions())
                .status(BookingStatus.PENDING)
                .faculty(faculty)
                .build();

        Booking saved = bookingRepository.save(booking);
        return BookingResponse.fromEntity(saved);
    }

    /**
     * Faculty views all their own bookings
     */
    public List<BookingResponse> getMyBookings() {
        User faculty = getCurrentUser();
        return bookingRepository.findByFacultyIdOrderByCreatedAtDesc(faculty.getId())
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Faculty views their bookings filtered by status
     */
    public List<BookingResponse> getMyBookingsByStatus(String status) {
        User faculty = getCurrentUser();
        BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        return bookingRepository.findByFacultyIdAndStatusOrderByCreatedAtDesc(faculty.getId(), bookingStatus)
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Faculty cancels their own pending booking
     */
    @Transactional
    public BookingResponse cancelBooking(Long bookingId) {
        User faculty = getCurrentUser();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BadRequestException("Booking not found"));

        if (!booking.getFaculty().getId().equals(faculty.getId())) {
            throw new BadRequestException("You can only cancel your own bookings");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new BadRequestException("Only pending bookings can be cancelled");
        }

        bookingRepository.delete(booking);
        return BookingResponse.fromEntity(booking);
    }

    // ==================== MANAGER OPERATIONS ====================

    /**
     * Manager views all booking requests
     */
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Manager views bookings filtered by status
     */
    public List<BookingResponse> getBookingsByStatus(String status) {
        BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        return bookingRepository.findByStatusOrderByCreatedAtAsc(bookingStatus)
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Manager approves or rejects a booking (FCFS with conflict check)
     */
    @Transactional
    public BookingResponse reviewBooking(ReviewRequest request) {
        User manager = getCurrentUser();

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new BadRequestException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new BadRequestException("This booking has already been reviewed");
        }

        BookingStatus action;
        try {
            action = BookingStatus.valueOf(request.getAction().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid action. Use APPROVED or REJECTED");
        }

        if (action != BookingStatus.APPROVED && action != BookingStatus.REJECTED) {
            throw new BadRequestException("Invalid action. Use APPROVED or REJECTED");
        }

        // If approving, check for time slot conflicts (FCFS policy)
        if (action == BookingStatus.APPROVED) {
            List<Booking> conflicts = bookingRepository.findConflictingBookings(
                    booking.getEventStartDate(),
                    booking.getStartTime(),
                    booking.getEndTime()
            );

            if (!conflicts.isEmpty()) {
                Booking conflict = conflicts.get(0);
                throw new BadRequestException(
                        String.format("Time slot conflict! Auditorium is already booked on %s from %s to %s for '%s'",
                                conflict.getEventStartDate(),
                                conflict.getStartTime(),
                                conflict.getEndTime(),
                                conflict.getEventTitle())
                );
            }
        }

        booking.setStatus(action);
        booking.setReviewedBy(manager);
        booking.setManagerRemarks(request.getRemarks());
        booking.setReviewedAt(LocalDateTime.now());

        Booking saved = bookingRepository.save(booking);
        return BookingResponse.fromEntity(saved);
    }

    /**
     * Upcoming approved bookings (schedule view)
     */
    public List<BookingResponse> getUpcomingBookings() {
        return bookingRepository.findUpcomingApproved(LocalDate.now())
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Bookings for a specific date
     */
    public List<BookingResponse> getBookingsByDate(String date) {
        LocalDate eventDate = LocalDate.parse(date);
        return bookingRepository.findByEventStartDateAndStatusOrderByStartTimeAsc(eventDate, BookingStatus.APPROVED)
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // ==================== HELPERS ====================

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));
    }

    /**
     * Converts { "projector": true, "microphone": true, "wifi": false }
     * → "projector,microphone"  (only the true values)
     */
    private String mapToCommaSeparated(Map<String, Boolean> map) {
        if (map == null || map.isEmpty()) return null;
        return map.entrySet().stream()
                .filter(Map.Entry::getValue)
                .map(Map.Entry::getKey)
                .collect(Collectors.joining(","));
    }
}