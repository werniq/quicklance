package com.quicklance.backend.api;

import com.quicklance.backend.dto.User;
import com.quicklance.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserDetails(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getUserDetails(userId));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
