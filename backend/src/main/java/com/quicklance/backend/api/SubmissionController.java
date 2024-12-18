package com.quicklance.backend.api;

import com.quicklance.backend.dto.MessageModel;
import com.quicklance.backend.dto.Submission;
import com.quicklance.backend.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/task/submission")
    public ResponseEntity<MessageModel> submitSolution(@RequestBody Submission submission) {
        try {
            submissionService.addSubmission(submission);
            return ResponseEntity.ok(new MessageModel("Solution was submitted"));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
