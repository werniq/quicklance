package com.quicklance.backend.api;

import com.quicklance.backend.dto.MessageModel;
import com.quicklance.backend.dto.Submission;
import com.quicklance.backend.service.SubmissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class SubmissionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SubmissionController.class);

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    @PostMapping("/task/submission")
    public ResponseEntity<MessageModel> submitSolution(@RequestBody Submission submission) {
        try {
            submissionService.addSubmission(submission);
            return ResponseEntity.ok(new MessageModel("Solution was submitted"));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    @GetMapping("/task/{taskId}/submissions")
    public ResponseEntity<List<Submission>> getTaskSubmissions(@PathVariable Long taskId) {
        try {
            List<Submission> taskSubmissions = submissionService.getTaskSubmissions(taskId);
            return ResponseEntity.ok(taskSubmissions);
        } catch (Exception e) {
            LOGGER.error("Failed to get submissions for {}", taskId, e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<Submission> getSubmission(@PathVariable Long submissionId) {
        try {
            Submission submission = submissionService.getSubmissionById(submissionId);
            return ResponseEntity.ok(submission);
        } catch (Exception e) {
            LOGGER.error("Failed to get submission with id {}", submissionId, e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    @PostMapping("/task/{taskId}/submission/{submissionId}")
    public ResponseEntity<MessageModel> acceptSubmission(@PathVariable Long taskId, @PathVariable Long submissionId) {
        try {
            submissionService.acceptSubmission(taskId, submissionId);
            return ResponseEntity.ok(new MessageModel("Solution was successfully accepted"));
        } catch (Exception e) {
            LOGGER.error("Failed to accept submission {} for task {}", submissionId, taskId, e);
            return ResponseEntity.badRequest().body(new MessageModel(e.getMessage()));
        }
    }
}
