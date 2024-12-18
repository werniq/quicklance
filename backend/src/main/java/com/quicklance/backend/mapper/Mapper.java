package com.quicklance.backend.mapper;

import com.quicklance.backend.dto.Task;
import com.quicklance.backend.dto.User;
import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;

public class Mapper {
    public static Task mapTask(TaskEntity taskEntity) {
        return new Task(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getCredits(),
                taskEntity.getCreatedAt());
    }

    public static TaskEntity remapTask(Task task) {
        return new TaskEntity(task.title(), task.description(), task.credits(), task.createdAt());
    }

    public static User mapUser(UserEntity userEntity) {
        return new User(userEntity.getId(), userEntity.getFirstname(), userEntity.getLastname(), userEntity.getType());
    }
}
