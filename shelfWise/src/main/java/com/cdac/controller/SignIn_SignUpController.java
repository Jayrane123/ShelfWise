package com.cdac.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AddAdminDTO;
import com.cdac.dto.AddUserDTO;
import com.cdac.dto.AuthResponse;
import com.cdac.dto.UserSignInRequest;
import com.cdac.entities.Admin;
import com.cdac.entities.User;
import com.cdac.security.JwtUtils;
import com.cdac.service.AdminService;
import com.cdac.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class SignIn_SignUpController {

	private final AdminService adminService;
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;

	@PostMapping("/admin/signup")
	public ResponseEntity<?> registerAdmin(@RequestBody @Valid AddAdminDTO reqDTO) {
		System.out.println("Admin signup: " + reqDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdmin(reqDTO));
	}

	@PostMapping("/user/signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid AddUserDTO reqDTO) {
		System.out.println("User signup: " + reqDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(reqDTO));
	}

	@PostMapping("/user/signin")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInRequest dto) {
		System.out.println("User sign-in: " + dto);

		Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

		String jwt = jwtUtils.generateJwtToken(auth);
		User user = (User) auth.getPrincipal();

		AuthResponse response = new AuthResponse(
				"User login successful",
				jwt,
				user.getName(),
				user.getEmail()
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/admin/signin")
	public ResponseEntity<?> signInAdmin(@RequestBody @Valid UserSignInRequest dto) {
		System.out.println("Admin sign-in: " + dto);

		Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

		String jwt = jwtUtils.generateJwtToken(auth);
		Admin admin = (Admin) auth.getPrincipal();

		AuthResponse response = new AuthResponse(
				"Admin login successful",
				jwt,
				admin.getName(),
				admin.getEmail()
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}


