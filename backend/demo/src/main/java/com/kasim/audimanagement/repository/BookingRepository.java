package com.kasim.audimanagement.repository;

import com.kasim.audimanagement.entity.Booking;
import com.kasim.audimanagement.entity.Booking.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Faculty: get all their own bookings
    List<Booking> findByFacultyIdOrderByCreatedAtDesc(Long facultyId);

    // Faculty: get their bookings filtered by status
    List<Booking> findByFacultyIdAndStatusOrderByCreatedAtDesc(Long facultyId, BookingStatus status);

    // Manager: get all bookings
    List<Booking> findAllByOrderByCreatedAtDesc();

    // Manager: get bookings filtered by status (FCFS = oldest first)
    List<Booking> findByStatusOrderByCreatedAtAsc(BookingStatus status);

    // Check for time slot conflicts on a given date (only APPROVED bookings)
    @Query("SELECT b FROM Booking b WHERE b.eventStartDate = :date " +
            "AND b.status = 'APPROVED' " +
            "AND b.startTime < :endTime " +
            "AND b.endTime > :startTime")
    List<Booking> findConflictingBookings(
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    // Get approved bookings for a specific date (calendar view)
    List<Booking> findByEventStartDateAndStatusOrderByStartTimeAsc(LocalDate eventStartDate, BookingStatus status);

    // Get upcoming approved bookings
    @Query("SELECT b FROM Booking b WHERE b.eventStartDate >= :today " +
            "AND b.status = 'APPROVED' ORDER BY b.eventStartDate ASC, b.startTime ASC")
    List<Booking> findUpcomingApproved(@Param("today") LocalDate today);
}