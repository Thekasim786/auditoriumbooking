package com.kasim.audimanagement.controller;

import com.kasim.audimanagement.dto.BookingRequest;
import com.kasim.audimanagement.dto.BookingResponse;
import com.kasim.audimanagement.dto.DashboardDTO;
import com.kasim.audimanagement.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // ✅ Create booking
    @PostMapping("/create")
    public BookingResponse createBooking(
            @RequestBody BookingRequest request,
            Authentication authentication) {

        String email = authentication.getName();
        return bookingService.createBooking(email, request);
    }

    // ✅ Get my bookings
    @GetMapping("/my-bookings")
    public List<BookingResponse> getMyBookings(Authentication authentication) {
        String email = authentication.getName();
        return bookingService.getBookingsByFaculty(email);
    }

    // ✅ Cancel booking
    @PutMapping("/cancel/{id}")
    public void cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();
        bookingService.cancelBooking(id, email);
    }
    
    @GetMapping("/dashboard")
public DashboardDTO getDashboard(Authentication authentication) {
    String email = authentication.getName();
    return bookingService.getDashboardData(email);
}
}