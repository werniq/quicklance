package com.quicklance.backend.entity;

import com.quicklance.backend.dto.TaskRequest;
import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private final UserEntity author;

    @Column(name = "createdAt", nullable = false)
    private final LocalDate createdAt;

    public static TaskEntity from(TaskRequest taskRequest, UserEntity author) {
        return new TaskEntity(
                taskRequest.title(),
                taskRequest.description(),
                taskRequest.credits(),
                author,
                LocalDate.now());
    }

    public TaskEntity(String title, String description, Integer credits, UserEntity author, LocalDate createdAt) {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.author = author;
        this.createdAt = createdAt;
    }

    public TaskEntity() {
        this(null, null, null, null, null);
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

    public UserEntity getAuthor() {
        return author;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }
}
