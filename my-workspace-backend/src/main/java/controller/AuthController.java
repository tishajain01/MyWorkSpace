package com.example.Project.Management.controller;

import com.example.Project.Management.model.User;
import com.example.Project.Management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    // Standard Registration for all users
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (userRepo.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Email already exists"));
            }

            // Encrypting password before saving to DB
            user.setPassword(encoder.encode(user.getPassword()));

            // Ensuring every user starts with 'USER' role for our workspace logic
            user.setRole("USER");

            User savedUser = userRepo.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Registration failed due to server error"));
        }
    }

    // Standard Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");

            // Use a generic message for security so users don't know which email exists
            User user = userRepo.findByEmail(email)
                    .orElse(null);

            if (user != null && encoder.matches(password, user.getPassword())) {
                return ResponseEntity.ok(user);
            } else {
                // This matches the key 'message' we are looking for in React
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid email or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "A server error occurred during login"));
        }
    }

    // Keep this if you want to see who else is using the platform
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}