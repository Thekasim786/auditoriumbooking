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

    List<Booking> findByFacultyIdOrderByCreatedAtDesc(Long facultyId);

    List<Booking> findByFacultyIdAndStatusOrderByCreatedAtDesc(Long facultyId, BookingStatus status);

    List<Booking> findAllByOrderByCreatedAtDesc();

    List<Booking> findByStatusOrderByCreatedAtAsc(BookingStatus status);

    // Check conflicts for approved bookings
    @Query("SELECT b FROM Booking b WHERE b.eventStartDate = :date " +
            "AND b.status = 'APPROVED' " +
            "AND b.startTime < :endTime " +
            "AND b.endTime > :startTime")
    List<Booking> findConflictingBookings(
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    List<Booking> findByEventStartDateAndStatusOrderByStartTimeAsc(LocalDate eventStartDate, BookingStatus status);

    // Get upcoming approved bookings
    @Query("SELECT b FROM Booking b WHERE b.eventStartDate >= :today " +
            "AND b.status = 'APPROVED' ORDER BY b.eventStartDate ASC, b.startTime ASC")
    List<Booking> findUpcomingApproved(@Param("today") LocalDate today);
}