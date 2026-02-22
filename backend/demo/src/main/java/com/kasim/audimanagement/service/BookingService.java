package com.kasim.audimanagement.service;

import com.kasim.audimanagement.dto.BookingRequest;
import com.kasim.audimanagement.dto.BookingResponse;
import com.kasim.audimanagement.dto.DashboardDTO;
import com.kasim.audimanagement.entity.Booking;
import com.kasim.audimanagement.entity.User;
import com.kasim.audimanagement.repository.BookingRepository;
import com.kasim.audimanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    // ✅ CREATE BOOKING
    public BookingResponse createBooking(String email, BookingRequest dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean conflict = bookingRepository
                .existsByEventStartDateAndStartTimeAndEndTimeAndStatus(
                        dto.getEventStartDate(),
                        dto.getStartTime(),
                        dto.getEndTime(),
                        "APPROVED"
                );

        if (conflict) {
            throw new RuntimeException("Time slot already booked!");
        }

        Booking booking = Booking.builder()
                .venue(dto.getVenue())
                .eventType(dto.getEventType())
                .eventTitle(dto.getEventTitle())
                .eventStartDate(dto.getEventStartDate())
                .eventEndDate(dto.getEventEndDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .expectedAttendees(dto.getExpectedAttendees())
                .eventPurpose(dto.getEventPurpose())
                .seatingArrangement(dto.getSeatingArrangement())
                .seatingCapacity(dto.getSeatingCapacity())
                .stageRequirement(dto.getStageRequirement())
                .projector(dto.isProjector())
                .microphone(dto.isMicrophone())
                .soundSystem(dto.isSoundSystem())
                .whiteboard(dto.isWhiteboard())
                .videoConferencing(dto.isVideoConferencing())
                .wifi(dto.isWifi())
                .catering(dto.isCatering())
                .photography(dto.isPhotography())
                .recording(dto.isRecording())
                .parking(dto.isParking())
                .specialRequirements(dto.getSpecialRequirements())
                .priority(dto.getPriority())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .faculty(user)
                .build();

        bookingRepository.save(booking);

        return new BookingResponse(
                booking.getId(),
                booking.getEventStartDate(),
                booking.getStartTime() + " - " + booking.getEndTime(),
                booking.getStatus()
        );
    }

    // ✅ GET BOOKINGS FOR FACULTY
    public List<BookingResponse> getBookingsByFaculty(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByFaculty(user)
                .stream()
                .map(b -> new BookingResponse(
                        b.getId(),
                        b.getEventStartDate(),
                        b.getStartTime() + " - " + b.getEndTime(),
                        b.getStatus()
                ))
                .collect(Collectors.toList());
    }

    // ✅ CANCEL BOOKING
    @Transactional
    public void cancelBooking(Long id, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getFaculty().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized action");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    public DashboardDTO getDashboardData(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    boolean isManager = user.getRole().equals("ROLE_MANAGER");

    long total;
    long approved;
    long pending;
    long upcoming;

    if (isManager) {

        total = bookingRepository.countByStatusNot("CANCELLED");
        approved = bookingRepository.countByStatus("APPROVED");
        pending = bookingRepository.countByStatus("PENDING");
        upcoming = bookingRepository.countByStatusAndEventStartDateAfter(
        "APPROVED",
        LocalDate.now()
);

    } else {

        total = bookingRepository.countByFacultyAndStatusNot(user, "CANCELLED");
        approved = bookingRepository.countByFacultyAndStatus(user, "APPROVED");
        pending = bookingRepository.countByFacultyAndStatus(user, "PENDING");
        upcoming = bookingRepository.countByFacultyAndStatusAndEventStartDateAfter(
                user, "APPROVED", LocalDate.now()
        );
    }

    return new DashboardDTO(total, approved, pending, upcoming);
}
}