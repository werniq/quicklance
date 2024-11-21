package com.quicklance.backend.service;

import com.quicklance.backend.dto.Task;
import com.quicklance.backend.dto.TaskRequest;
import com.quicklance.backend.exception.TaskDoesNotExist;
import com.quicklance.backend.mapper.Mapper;
import com.quicklance.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.quicklance.backend.mapper.Mapper.remapTask;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(Mapper::mapTask)
                .toList();
    }

    public Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId)
                .stream()
                .map(Mapper::mapTask)
                .findFirst()
                .orElseThrow(() -> new TaskDoesNotExist("Task with id " + taskId + " does not exist"));
    }

    public void createNewTask(TaskRequest taskRequest) {
        Task task = Task.from(taskRequest);
        taskRepository.save(remapTask(task));
    }
}
