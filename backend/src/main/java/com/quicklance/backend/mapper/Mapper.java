package com.quicklance.backend.mapper;

import com.quicklance.backend.dto.Submission;
import com.quicklance.backend.dto.Task;
import com.quicklance.backend.dto.User;
import com.quicklance.backend.entity.SubmissionEntity;
import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;

import java.util.List;

public class Mapper {
    public static List<Task> mapTasks(List<TaskEntity> taskEntities) {
        return taskEntities
                .stream()
                .map(Mapper::mapTask)
                .toList();
    }

    public static Task mapTask(TaskEntity taskEntity) {
        return new Task(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getCredits(),
                mapUser(taskEntity.getAuthor()),
                taskEntity.getCreatedAt());
    }

    public static User mapUser(UserEntity userEntity) {
        return new User(
                userEntity.getId(),
                userEntity.getFirstname(),
                userEntity.getLastname(),
                userEntity.getType(),
                userEntity.getCredits());
    }

    public static List<Submission> mapSubmissions(List<SubmissionEntity> submissionEntities) {
        return submissionEntities
                .stream()
                .map(Mapper::mapSubmission)
                .toList();
    }

    public static Submission mapSubmission(SubmissionEntity submission) {
        return new Submission(
                submission.getSolution(),
                submission.getDescription(),
                submission.getId(),
                submission.getTask().getId());
    }
}
