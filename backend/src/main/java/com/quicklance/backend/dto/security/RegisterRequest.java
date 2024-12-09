package com.quicklance.backend.dto.security;

public record RegisterRequest (String firstName, String lastName, String email, String password) {}
