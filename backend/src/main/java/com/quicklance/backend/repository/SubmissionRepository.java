package com.quicklance.backend.repository;

import com.quicklance.backend.entity.SubmissionEntity;
import com.quicklance.backend.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<SubmissionEntity, Long> {
    List<SubmissionEntity> findAllByTask(TaskEntity task);
}
