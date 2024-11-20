package com.quicklance.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "task")
public class TaskEntity extends BaseEntity {

    @Column(name = "title", nullable = false)
    private final String title;

    @Column(name = "description", nullable = false)
    private final String description;

    @Column(name = "credits", nullable = false)
    private final Integer credits;

    public TaskEntity(String title, String description, Integer credits) {
        this.title = title;
        this.description = description;
        this.credits = credits;
    }

    public TaskEntity() {
        this(null, null, null);
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
}
