package com.quicklance.backend.service;

import com.quicklance.backend.dto.Task;
import com.quicklance.backend.mapper.Mapper;
import com.quicklance.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
