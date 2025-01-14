package com.quicklance.backend.dto;

public record Submission(Long id, byte[] solution, String description, long userId, long taskId) {}
