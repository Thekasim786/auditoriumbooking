package com.kasim.audimanagement.controller;

import com.kasim.audimanagement.dto.BookingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kasim.audimanagement.service.BookingService;

import java.util.List;

/**
 * Shared endpoints accessible by both FACULTY and MANAGER
 * (configured in SecurityConfig under /api/bookings/**)
 */
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /**
     * GET /api/bookings/date/{date} — Check approved bookings for a date
     * Used by faculty for availability check & manager for calendar view
     */
    @GetMapping("/date/{date}")
    public ResponseEntity<List<BookingResponse>> getBookingsByDate(@PathVariable String date) {
        return ResponseEntity.ok(bookingService.getBookingsByDate(date));
    }

    /**
     * GET /api/bookings/upcoming — Get upcoming approved bookings
     * Visible to both roles
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<BookingResponse>> getUpcomingBookings() {
        return ResponseEntity.ok(bookingService.getUpcomingBookings());
    }
}