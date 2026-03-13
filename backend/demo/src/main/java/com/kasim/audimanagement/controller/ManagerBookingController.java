package com.kasim.audimanagement.controller;

import com.kasim.audimanagement.dto.BookingResponse;
import com.kasim.audimanagement.dto.ReviewRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.kasim.audimanagement.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/manager/bookings")
@PreAuthorize("hasRole('MANAGER')")
@RequiredArgsConstructor
public class ManagerBookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookingResponse>> getBookingsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }

    @PostMapping("/review")
    public ResponseEntity<BookingResponse> reviewBooking(@Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(bookingService.reviewBooking(request));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<BookingResponse>> getUpcomingBookings() {
        return ResponseEntity.ok(bookingService.getUpcomingBookings());
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<BookingResponse>> getBookingsByDate(@PathVariable String date) {
        return ResponseEntity.ok(bookingService.getBookingsByDate(date));
    }
}