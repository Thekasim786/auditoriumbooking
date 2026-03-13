package com.kasim.audimanagement.controller;

import com.kasim.audimanagement.dto.BookingRequest;
import com.kasim.audimanagement.dto.BookingResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.kasim.audimanagement.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/faculty/bookings")
@PreAuthorize("hasRole('FACULTY')")
@RequiredArgsConstructor
public class FacultyBookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> submitBooking(@Valid @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.submitBooking(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getMyBookings() {
        return ResponseEntity.ok(bookingService.getMyBookings());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookingResponse>> getMyBookingsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(bookingService.getMyBookingsByStatus(status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }
}