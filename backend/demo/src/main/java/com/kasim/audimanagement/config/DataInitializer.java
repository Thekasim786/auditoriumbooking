package com.kasim.audimanagement.config;

import com.kasim.audimanagement.entity.User;
import com.kasim.audimanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // ---- AUDITORIUM MANAGER ----
        if (!userRepository.existsByEmail("manager@bvicam.in")) {
            User manager = User.builder()
                    .fullName("Auditorium Manager")
                    .username("manager")
                    .email("manager@bvicam.in")
                    .password(passwordEncoder.encode("manager123"))
                    .provider(User.AuthProvider.LOCAL)
                    .role(User.Role.ROLE_MANAGER)
                    .enabled(true)
                    .build();
            userRepository.save(manager);
            logger.info("Manager created: manager@bvicam.in / manager123");
        }

        // ---- FACULTY MEMBERS ----
        if (!userRepository.existsByEmail("rahul@bvicam.in")) {
            User faculty1 = User.builder()
                    .fullName("Dr. Rahul Sharma")
                    .username("rahul")
                    .email("rahul@bvicam.in")
                    .password(passwordEncoder.encode("faculty123"))
                    .provider(User.AuthProvider.LOCAL)
                    .role(User.Role.ROLE_FACULTY)
                    .enabled(true)
                    .build();
            userRepository.save(faculty1);
            logger.info("Faculty created: rahul@bvicam.in / faculty123");
        }

        if (!userRepository.existsByEmail("ayesha@bvicam.in")) {
            User faculty2 = User.builder()
                    .fullName("Prof. Ayesha Khan")
                    .username("ayesha")
                    .email("ayesha@bvicam.in")
                    .password(passwordEncoder.encode("faculty123"))
                    .provider(User.AuthProvider.LOCAL)
                    .role(User.Role.ROLE_FACULTY)
                    .enabled(true)
                    .build();
            userRepository.save(faculty2);
            logger.info("Faculty created: ayesha@bvicam.in / faculty123");
        }

        if (!userRepository.existsByEmail("kasim@bvicam.in")) {
            User faculty3 = User.builder()
                    .fullName("Kasim")
                    .username("kasim")
                    .email("kasim@bvicam.in")
                    .password(passwordEncoder.encode("kasim123"))
                    .provider(User.AuthProvider.LOCAL)
                    .role(User.Role.ROLE_FACULTY)
                    .enabled(true)
                    .build();
            userRepository.save(faculty3);
            logger.info("Faculty created: kasim@bvicam.in / kasim123");
        }
    }
}