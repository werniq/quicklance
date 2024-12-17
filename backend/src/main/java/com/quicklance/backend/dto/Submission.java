package com.quicklance.backend.dto;

public record Submission(byte[] solution, long userId, long taskId) {}
