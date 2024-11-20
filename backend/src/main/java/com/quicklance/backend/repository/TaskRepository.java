package com.quicklance.backend.repository;

import com.quicklance.backend.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {}
