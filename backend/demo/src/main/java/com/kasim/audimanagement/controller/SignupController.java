//package com.kasim.audimanagement.controller;
//
//import com.kasim.audimanagement.model.User;
//import com.kasim.audimanagement.repository.UserRepository;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api")
//public class SignupController {
//
//    private final UserRepository userRepo;
//
//    public SignupController(UserRepository userRepo) {
//        this.userRepo = userRepo;
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody User user) {
//
//        if (user.getUsername() == null || user.getPassword() == null) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Map.of("error", "Username and password required"));
//        }
//
//        if (userRepo.existsByUsername(user.getUsername())) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Map.of("error", "Username already exists"));
//        }
//
//        userRepo.save(user);
//
//        return ResponseEntity.ok(
//                Map.of("message", "Signup successful")
//        );
//    }
//}
//
