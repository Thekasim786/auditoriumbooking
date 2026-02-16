package com.kasim.audimanagement.service;

import com.kasim.audimanagement.dto.*;
import com.kasim.audimanagement.entity.User;
import com.kasim.audimanagement.exception.BadRequestException;
import com.kasim.audimanagement.repository.UserRepository;
import com.kasim.audimanagement.security.CustomUserDetails;
import com.kasim.audimanagement.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(
                    authentication, loginRequest.isRememberMe());

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            Set<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            return AuthResponse.builder()
                    .token(jwt)
                    .type("Bearer")
                    .id(userDetails.getId())
                    .email(userDetails.getUsername())
                    .fullName(userDetails.getFullName())
                    .roles(roles)
                    .build();

        } catch (BadCredentialsException ex) {
            throw new BadRequestException("Invalid email or password");
        }
    }

    @Transactional
    public ApiResponse signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("An account with this email already exists");
        }

        User user = User.builder()
                .fullName(signupRequest.getFullName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .provider(User.AuthProvider.LOCAL)
                .roles(Set.of(User.Role.ROLE_FACULTY))
                .enabled(true)
                .build();

        userRepository.save(user);

        return ApiResponse.success("Account created successfully. You can now sign in.");
    }

    public AuthResponse getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();

        Set<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        return AuthResponse.builder()
                .id(userDetails.getId())
                .email(userDetails.getUsername())
                .fullName(userDetails.getFullName())
                .roles(roles)
                .build();
    }
}