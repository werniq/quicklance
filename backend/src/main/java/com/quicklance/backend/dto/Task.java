package com.quicklance.backend.dto;

import java.time.LocalDate;

public record Task(Long id, String title, String description, Long credits, User author, LocalDate createdAt) {}
