package com.quicklance.backend.dto.security;

import com.quicklance.backend.entity.UserType;

public record RegisterRequest (String firstname, String lastname, String email, String password, UserType userType) {}
