package com.quicklance.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "submissions")
public class SubmissionEntity extends BaseEntity {

    @Lob
    @Column(name = "solution", nullable = false)
    private final byte[] solution;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private final UserEntity user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private final TaskEntity task;

    public SubmissionEntity(byte[] solution, UserEntity user, TaskEntity task) {
        this.solution = solution;
        this.user = user;
        this.task = task;
    }

    public SubmissionEntity() {
        this(null, null, null);
    }

    public byte[] getSolution() {
        return solution;
    }

    public UserEntity getUser() {
        return user;
    }

    public TaskEntity getTask() {
        return task;
    }
}
