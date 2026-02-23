package com.kasim.audimanagement.repository;

import com.kasim.audimanagement.entity.Booking;
import com.kasim.audimanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Faculty bookings
    List<Booking> findByFaculty(User faculty);

    // Conflict check
    boolean existsByEventStartDateAndStartTimeAndEndTimeAndStatus(
            LocalDate eventStartDate,
            LocalTime startTime,
            LocalTime endTime,
            String status
    );

    // ================= DASHBOARD COUNTS =================

    // Total (excluding cancelled)
    long countByFacultyAndStatusNot(User faculty, String status);

    long countByStatusNot(String status);

    // Approved
    long countByFacultyAndStatus(User faculty, String status);

    long countByStatus(String status);

    // Upcoming (approved + future date)
   long countByFacultyAndStatusAndEventStartDateAfter(User faculty, String status, LocalDate date);
long countByStatusAndEventStartDateAfter(String status, LocalDate date);
}