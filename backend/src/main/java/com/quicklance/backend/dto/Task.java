package com.quicklance.backend.dto;

import java.time.LocalDate;

public record Task(Long id, String title, String description, Integer credits, User author, LocalDate createdAt) {}
