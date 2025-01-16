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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.userService = userService;
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

    @Transactional
    public void createNewTask(TaskRequest taskRequest) {
        UserEntity userEntity = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long taskCredits = taskRequest.credits();
        if (userEntity.getCredits() < taskCredits) {
            throw new IllegalArgumentException("User doesn't have enough credits");
        }
        userService.updateUserCredits(userEntity.getId(), -1 * taskRequest.credits());
        TaskEntity taskEntity = TaskEntity.from(taskRequest, userEntity);
        taskRepository.save(taskEntity);
    }
}
