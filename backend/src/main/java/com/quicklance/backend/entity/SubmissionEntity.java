package com.quicklance.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "submissions")
public class SubmissionEntity extends BaseEntity {

    @Lob
    @Column(name = "solution", nullable = false)
    private final byte[] solution;

    @Column(name = "description", nullable = false)
    private final String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private final UserEntity user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private final TaskEntity task;

    public SubmissionEntity(byte[] solution, String description, UserEntity user, TaskEntity task) {
        this.solution = solution;
        this.description = description;
        this.user = user;
        this.task = task;
    }

    public SubmissionEntity() {
        this(null, null, null, null);
    }

    public byte[] getSolution() {
        return solution;
    }

    public String getDescription() {
        return description;
    }

    public UserEntity getUser() {
        return user;
    }

    public TaskEntity getTask() {
        return task;
    }
}
