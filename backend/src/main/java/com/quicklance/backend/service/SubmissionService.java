package com.quicklance.backend.service;

import com.quicklance.backend.dto.Submission;
import com.quicklance.backend.entity.SubmissionEntity;
import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;
import com.quicklance.backend.repository.SubmissionRepository;
import com.quicklance.backend.repository.TaskRepository;
import com.quicklance.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.quicklance.backend.mapper.Mapper.mapSubmissions;

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
        TaskEntity task = getTaskEntity(submission.taskId());
        var submissionEntity = new SubmissionEntity(submission.solution(), user, task);
        submissionRepository.save(submissionEntity);
    }

    @Transactional
    public List<Submission> getTaskSubmissions(Long taskId) {
        TaskEntity task = getTaskEntity(taskId);
        List<SubmissionEntity> taskSubmissions = submissionRepository.findAllByTask(task);
        return mapSubmissions(taskSubmissions);
    }

    private TaskEntity getTaskEntity(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task does not exist"));
    }
}
