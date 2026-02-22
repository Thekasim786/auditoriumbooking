package com.kasim.audimanagement.dto;

import java.time.LocalDate;

public record BookingResponse(
        Long id,
        LocalDate eventDate,
        String timeSlot,
        String status
) {}