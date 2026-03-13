package com.kasim.audimanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    // ---- Event Details ----
    @Column(nullable = false)
    private String eventType;

    @Column(nullable = false)
    private String eventTitle;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private LocalDate eventStartDate;

    private LocalDate eventEndDate;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private Integer expectedAttendees;

    @Column(nullable = false, length = 2000)
    private String eventPurpose;

    // ---- Facility Requirements ----
    private String seatingArrangement;

    private Integer seatingCapacity;

    private String stageRequirement;

    // Technical equipment stored as comma-separated: "projector,microphone,soundSystem"
    private String technicalEquipment;

    // Additional services stored as comma-separated: "catering,photography"
    private String additionalServices;

    @Column(length = 2000)
    private String specialRequirements;

    // ---- Submission ----
    @Column(nullable = false)
    @Builder.Default
    private String priority = "normal";

    @Column(length = 2000)
    private String specialInstructions;

    // ---- Status & Review ----
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    private String managerRemarks;

    private LocalDateTime reviewedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum BookingStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}