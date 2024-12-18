package com.quicklance.backend.service;

import com.quicklance.backend.dto.Submission;
import com.quicklance.backend.entity.SubmissionEntity;
import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;
import com.quicklance.backend.repository.SubmissionRepository;
import com.quicklance.backend.repository.TaskRepository;
import com.quicklance.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public SubmissionService(SubmissionRepository submissionRepository,
                             UserRepository userRepository,
                             TaskRepository taskRepository) {
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public void addSubmission(Submission submission) {
        UserEntity user = userRepository.findById(submission.userId())
                .orElseThrow(() -> new IllegalArgumentException("User does not exist"));
        TaskEntity task = taskRepository.findById(submission.taskId())
                .orElseThrow(() -> new IllegalArgumentException("Task does not exist"));
        var submissionEntity = new SubmissionEntity(submission.solution(), user, task);
        submissionRepository.save(submissionEntity);
    }

}
