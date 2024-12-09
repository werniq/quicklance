package com.quicklance.backend.service;

import com.quicklance.backend.dto.security.AuthResponse;
import com.quicklance.backend.dto.security.LoginRequest;
import com.quicklance.backend.dto.security.RegisterRequest;
import com.quicklance.backend.entity.UserEntity;
import com.quicklance.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtService jwtService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        UserEntity user = new UserEntity(
                request.firstname(),
                request.lastname(),
                request.email(),
                passwordEncoder.encode(request.password()),
                request.userType());
        userRepository.save(user);
        String jwtToken = jwtService.generateJwtToken(Map.of("type", request.userType().name()), user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User was not found"));
        String jwtToken = jwtService.generateJwtToken(
                Map.of("type", user.getAuthorities()
                        .stream()
                        .findFirst()
                        .orElseThrow(() -> new IllegalArgumentException("Type was not decoded"))),
                user);
        return new AuthResponse(jwtToken);
    }
}
