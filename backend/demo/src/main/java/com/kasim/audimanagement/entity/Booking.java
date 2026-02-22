package com.kasim.audimanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(length = 1000)
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

    @Column(length = 500)
    private String specialRequirements;

    private String priority;

    // =====================
    // SYSTEM FIELDS
    // =====================

    private String status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    @JsonIgnore
    private User faculty;
}