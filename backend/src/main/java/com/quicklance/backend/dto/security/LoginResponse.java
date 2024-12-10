package com.quicklance.backend.dto.security;

import com.quicklance.backend.entity.UserType;

public record LoginResponse(String jwtToken, String email, UserType userType) {}
