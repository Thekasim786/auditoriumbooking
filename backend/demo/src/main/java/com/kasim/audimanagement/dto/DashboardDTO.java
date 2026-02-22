package com.kasim.audimanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDTO {

    private long totalRequests;
    private long approved;
    private long pending;
    private long upcoming;
}