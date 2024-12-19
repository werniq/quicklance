package com.quicklance.backend.api;

import com.quicklance.backend.dto.MessageModel;
import com.quicklance.backend.dto.User;
import com.quicklance.backend.dto.security.CreditsRequest;
import com.quicklance.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/user/credits")
    public ResponseEntity<MessageModel> updateUserCredits(@RequestBody CreditsRequest creditsRequest) {
        try {
            Long userId = creditsRequest.userId();
            userService.updateUserCredits(userId, creditsRequest.credits());
            return ResponseEntity.ok(new MessageModel("Credits for user " + userId + " were updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
