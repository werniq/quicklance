package com.quicklance.backend.api;

import com.quicklance.backend.dto.MessageModel;
import com.quicklance.backend.dto.Task;
import com.quicklance.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            return ResponseEntity.ok(taskService.getAllTasks());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getTaskById(taskId));
    }

    @PostMapping("/task")
    public ResponseEntity<MessageModel> addTask(@RequestBody Task task) {
        try {
            taskService.createNewTask(task);
            return ResponseEntity.ok(new MessageModel("Task was added"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageModel(e.getMessage()));
        }
    }
}
