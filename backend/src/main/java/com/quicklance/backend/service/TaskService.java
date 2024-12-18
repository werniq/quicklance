package com.quicklance.backend.service;

import com.quicklance.backend.dto.Task;
import com.quicklance.backend.dto.TaskRequest;
import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;
import com.quicklance.backend.exception.TaskDoesNotExist;
import com.quicklance.backend.exception.UserDoesNotExist;
import com.quicklance.backend.mapper.Mapper;
import com.quicklance.backend.repository.TaskRepository;
import com.quicklance.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getAllTasks() {
        return Mapper.mapTasks(taskRepository.findAll());
    }

    public List<Task> getUserTasks(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExist("User does not exist"));
        return Mapper.mapTasks(taskRepository.findAllByAuthor(user));
    }

    public Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId)
                .stream()
                .map(Mapper::mapTask)
                .findFirst()
                .orElseThrow(() -> new TaskDoesNotExist("Task with id " + taskId + " does not exist"));
    }

    public void createNewTask(TaskRequest taskRequest) {
        UserEntity userEntity = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TaskEntity taskEntity = TaskEntity.from(taskRequest, userEntity);
        taskRepository.save(taskEntity);
    }
}
