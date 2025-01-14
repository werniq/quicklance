package com.quicklance.backend.service;

import com.quicklance.backend.dto.User;
import com.quicklance.backend.entity.UserEntity;
import com.quicklance.backend.exception.UserDoesNotExist;
import com.quicklance.backend.mapper.Mapper;
import com.quicklance.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserDetails(Long userId) {
        UserEntity userEntity = getUserEntity(userId);
        return Mapper.mapUser(userEntity);
    }

    @Transactional
    public void updateUserCredits(Long userId, Long credits) {
        UserEntity user = getUserEntity(userId);
        user.setCredits(user.getCredits() + credits);
    }

    private UserEntity getUserEntity(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExist("User with id " + userId + " does not exist"));
    }
}
