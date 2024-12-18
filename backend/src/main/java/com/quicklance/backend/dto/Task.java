package com.quicklance.backend.dto;

import java.time.LocalDate;

public record Task(Long id, String title, String description, Integer credits, LocalDate createdAt) {
    public static Task from(TaskRequest taskRequest) {
        return new Task(
                null,
                taskRequest.title(),
                taskRequest.description(),
                taskRequest.credits(),
                LocalDate.now());
    }
}
