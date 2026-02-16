package com.kasim.audimanagement.config;

import com.kasim.audimanagement.entity.User;
import com.kasim.audimanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@bvicam.in")) {
            User admin = User.builder()
                    .fullName("System Admin")
                    .email("admin@bvicam.in")
                    .password(passwordEncoder.encode("admin123"))
                    .provider(User.AuthProvider.LOCAL)
                    .roles(Set.of(User.Role.ROLE_ADMIN, User.Role.ROLE_FACULTY))
                    .enabled(true)
                    .build();
            userRepository.save(admin);
            logger.info("Default admin user created: admin@bvicam.in / admin123");
        }

        if (!userRepository.existsByEmail("faculty@bvicam.in")) {
            User faculty = User.builder()
                    .fullName("Sample Faculty")
                    .email("faculty@bvicam.in")
                    .password(passwordEncoder.encode("faculty123"))
                    .provider(User.AuthProvider.LOCAL)
                    .roles(Set.of(User.Role.ROLE_FACULTY))
                    .enabled(true)
                    .build();
            userRepository.save(faculty);
            logger.info("Sample faculty user created: faculty@bvicam.in / faculty123");
        }
    }
}