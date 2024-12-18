package com.quicklance.backend.repository;

import com.quicklance.backend.entity.TaskEntity;
import com.quicklance.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findAllByAuthor(UserEntity userEntity);
}
