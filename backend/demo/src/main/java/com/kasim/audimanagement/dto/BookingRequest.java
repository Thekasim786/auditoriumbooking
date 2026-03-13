package com.kasim.audimanagement.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

    @NotBlank(message = "Event type is required")
    private String eventType;

    @NotBlank(message = "Event title is required")
    private String eventTitle;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotNull(message = "Event start date is required")
    private String eventStartDate; // "2026-03-15"

    private String eventEndDate; // "2026-03-15"

    @NotNull(message = "Start time is required")
    private String startTime; // "09:00"

    @NotNull(message = "End time is required")
    private String endTime; // "11:00"

    @NotNull(message = "Expected attendees is required")
    @Min(value = 1, message = "At least 1 attendee is required")
    private Integer expectedAttendees;

    @NotBlank(message = "Event purpose is required")
    @Size(max = 2000, message = "Purpose cannot exceed 2000 characters")
    private String eventPurpose;

    private String seatingArrangement;

    private Integer seatingCapacity;

    private String stageRequirement;

    // { "projector": true, "microphone": false, ... }
    private Map<String, Boolean> technicalEquipment;

    // { "catering": true, "photography": false, ... }
    private Map<String, Boolean> additionalServices;

    private String specialRequirements;

    private String priority;

    private String specialInstructions;
}