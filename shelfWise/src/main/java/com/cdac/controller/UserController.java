package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.UserIdDTO;
import com.cdac.service.UserService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	
	@Autowired
    private UserService userService;	
	@GetMapping("/getall")
    public ResponseEntity<List<UserIdDTO>> getAllBooks() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
