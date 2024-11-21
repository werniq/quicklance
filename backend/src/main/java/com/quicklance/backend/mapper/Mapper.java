package com.quicklance.backend.mapper;

import com.quicklance.backend.dto.Task;
import com.quicklance.backend.entity.TaskEntity;

public class Mapper {
    public static Task mapTask(TaskEntity taskEntity) {
        return new Task(taskEntity.getTitle(), taskEntity.getDescription(), taskEntity.getCredits(), taskEntity.getCreatedAt());
    }

    public static TaskEntity remapTask(Task task) {
        return new TaskEntity(task.title(), task.description(), task.credits(), task.createdAt());
    }
}
