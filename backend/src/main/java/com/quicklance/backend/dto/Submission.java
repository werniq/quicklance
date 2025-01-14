package com.quicklance.backend.dto;

public record Submission(byte[] solution, String description, long userId, long taskId) {}
