package com.kasim.audimanagement.dto;

import com.kasim.audimanagement.entity.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;
    private String eventType;
    private String eventTitle;
    private String venue;
    private String eventStartDate;
    private String eventEndDate;
    private String startTime;
    private String endTime;
    private Integer expectedAttendees;
    private String eventPurpose;

    private String seatingArrangement;
    private Integer seatingCapacity;
    private String stageRequirement;
    private Map<String, Boolean> technicalEquipment;
    private Map<String, Boolean> additionalServices;
    private String specialRequirements;

    private String priority;
    private String specialInstructions;
    private String status;

    // Faculty info
    private Long facultyId;
    private String facultyName;
    private String facultyEmail;

    // Review info
    private String managerRemarks;
    private String reviewedByName;
    private String reviewedAt;

    private String createdAt;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponseBuilder builder = BookingResponse.builder()
                .id(booking.getId())
                .eventType(booking.getEventType())
                .eventTitle(booking.getEventTitle())
                .venue(booking.getVenue())
                .eventStartDate(booking.getEventStartDate().toString())
                .eventEndDate(booking.getEventEndDate() != null ? booking.getEventEndDate().toString() : null)
                .startTime(booking.getStartTime().toString())
                .endTime(booking.getEndTime().toString())
                .expectedAttendees(booking.getExpectedAttendees())
                .eventPurpose(booking.getEventPurpose())
                .seatingArrangement(booking.getSeatingArrangement())
                .seatingCapacity(booking.getSeatingCapacity())
                .stageRequirement(booking.getStageRequirement())
                .technicalEquipment(parseCommaSeparated(booking.getTechnicalEquipment()))
                .additionalServices(parseCommaSeparated(booking.getAdditionalServices()))
                .specialRequirements(booking.getSpecialRequirements())
                .priority(booking.getPriority())
                .specialInstructions(booking.getSpecialInstructions())
                .status(booking.getStatus().name())
                .facultyId(booking.getFaculty().getId())
                .facultyName(booking.getFaculty().getFullName())
                .facultyEmail(booking.getFaculty().getEmail())
                .managerRemarks(booking.getManagerRemarks())
                .createdAt(booking.getCreatedAt() != null ? booking.getCreatedAt().toString() : null);

        if (booking.getReviewedBy() != null) {
            builder.reviewedByName(booking.getReviewedBy().getFullName());
        }
        if (booking.getReviewedAt() != null) {
            builder.reviewedAt(booking.getReviewedAt().toString());
        }

        return builder.build();
    }

    /**
     * Converts "projector,microphone,soundSystem" → { "projector": true, "microphone": true, ... }
     */
    private static Map<String, Boolean> parseCommaSeparated(String value) {
        Map<String, Boolean> map = new LinkedHashMap<>();
        if (value == null || value.isBlank()) return map;
        for (String item : value.split(",")) {
            map.put(item.trim(), true);
        }
        return map;
    }
}