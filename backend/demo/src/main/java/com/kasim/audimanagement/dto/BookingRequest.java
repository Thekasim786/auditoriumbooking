package com.kasim.audimanagement.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingRequest {

    // =====================
    // EVENT DETAILS
    // =====================

    private String venue;
    private String eventType;
    private String eventTitle;

    private LocalDate eventStartDate;
    private LocalDate eventEndDate;

    private LocalTime startTime;
    private LocalTime endTime;

    private Integer expectedAttendees;

    private String eventPurpose;

    // =====================
    // FACILITY REQUIREMENTS
    // =====================

    private String seatingArrangement;
    private Integer seatingCapacity;
    private String stageRequirement;

    // =====================
    // TECHNICAL EQUIPMENT
    // =====================

    private boolean projector;
    private boolean microphone;
    private boolean soundSystem;
    private boolean whiteboard;
    private boolean videoConferencing;
    private boolean wifi;

    // =====================
    // ADDITIONAL SERVICES
    // =====================

    private boolean catering;
    private boolean photography;
    private boolean recording;
    private boolean parking;

    // =====================
    // EXTRA DETAILS
    // =====================

    private String specialRequirements;
    private String priority;
}