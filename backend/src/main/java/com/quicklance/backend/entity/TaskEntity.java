package com.quicklance.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class TaskEntity extends BaseEntity {

    @Column(name = "title", nullable = false)
    private final String title;

    @Column(name = "description", nullable = false)
    private final String description;

    @Column(name = "credits", nullable = false)
    private final Integer credits;

    @Column(name = "createdAt", nullable = false)
    private final LocalDate createdAt;

    public TaskEntity(String title, String description, Integer credits, LocalDate createdAt) {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.createdAt = createdAt;
    }

    public TaskEntity() {
        this(null, null, null, null);
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Integer getCredits() {
        return credits;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }
}
