package com.quicklance.backend.dto.security;

import com.quicklance.backend.entity.UserType;

public record LoginResponse(String jwtToken, Long userId, String email, UserType userType) {}
