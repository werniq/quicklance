package com.quicklance.backend.api;

import com.quicklance.backend.dto.MessageModel;
import com.quicklance.backend.dto.Task;
import com.quicklance.backend.dto.TaskRequest;
import com.quicklance.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            return ResponseEntity.ok(taskService.getAllTasks());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/user/{userId}/tasks")
    public ResponseEntity<List<Task>> getAllUserTasks(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(taskService.getUserTasks(userId));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getTaskById(taskId));
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    @PostMapping("/task")
    public ResponseEntity<MessageModel> addTask(@RequestBody TaskRequest taskRequest) {
        try {
            taskService.createNewTask(taskRequest);
            return ResponseEntity.ok(new MessageModel("Task was added"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageModel(e.getMessage()));
        }
    }
}
