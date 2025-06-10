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

//package com.cdac.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.cdac.security.JwtUtils;
//import com.cdac.dto.UserSignInRequest;
//import com.cdac.dto.AuthResponse;
//import com.cdac.dto.AddAdminDTO;
//import com.cdac.dto.AddUserDTO;
//import com.cdac.service.AdminService;
//import com.cdac.service.UserService;
//
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//
//@CrossOrigin(origins = "http://localhost:5173")
//@RestController
//@RequestMapping("/auth")
//@AllArgsConstructor
//public class SignIn_SignUpController {
//	
//	
//	private final AdminService adminService;
//	private final AuthenticationManager authenticationManager;
//	
//	private final UserService userService;
//	private JwtUtils jwtUtils;
////	@Autowired
////	private UserService userService;
////
////	public SignIn_SignUpController() {
////		System.out.println("in ctor of "+getClass());
////	}
//	
//	@PostMapping("/admin/signup")
//	public ResponseEntity<?> getAdminSignUp(@RequestBody @Valid  AddAdminDTO reqDTO){
//		System.out.println("in add "+reqDTO);
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(adminService.addAdmin(reqDTO));
//	}
//	
//	@PostMapping("/user/signup")
//	public ResponseEntity<?> getUserSignUp(@RequestBody @Valid AddUserDTO reqDTO){
//		System.out.println("in add "+reqDTO);
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(userService.addUser(reqDTO));
//	}
//	
//	@PostMapping("/user/signin")
//	public ResponseEntity<?> getUserSignUp(@RequestBody @Valid UserSignInRequest dto){
//		System.out.println("in user sign in " + dto);
//		// 1. create Authentication token (UsernamePasswordAuthToken - username(em) ,
//		// pwd
//		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(),
//				dto.getPassword());
//		System.out.println("is authenticated " + authToken.isAuthenticated());// f
//		// 2. invoke AuthenticationManager's - authenticate method - spring sec supplied
//		Authentication successfulAuth = authenticationManager.authenticate(authToken);
//		System.out.println("is authenticated " + successfulAuth.isAuthenticated());// true
//		System.out.println("principal " + successfulAuth.getPrincipal());// user details + granted authorities
//		System.out.println("principal class" + successfulAuth.getPrincipal().getClass());// com.app.entities.UserEntity
//																							// - UserDetails
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(new AuthResponse("successful login ....", 
//						jwtUtils.generateJwtToken(successfulAuth)
//		));
//		
//	}
//	@PostMapping("/admin/signin")
//	public ResponseEntity<?> getAdminSignUp(@RequestBody @Valid UserSignInRequest dto){
//		System.out.println("in admin sign in " + dto);
//		// 1. create Authentication token (UsernamePasswordAuthToken - username(em) ,
//		// pwd
//		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(),
//				dto.getPassword());
//		System.out.println("is authenticated " + authToken.isAuthenticated());// f
//		// 2. invoke AuthenticationManager's - authenticate method - spring sec supplied
//		Authentication successfulAuth = authenticationManager.authenticate(authToken);
//		System.out.println("is authenticated " + successfulAuth.isAuthenticated());// true
//		System.out.println("principal " + successfulAuth.getPrincipal());// user details + granted authorities
//		System.out.println("principal class" + successfulAuth.getPrincipal().getClass());// com.app.entities.UserEntity
//		// - UserDetails
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(new AuthResponse("successful login ....", 
//						jwtUtils.generateJwtToken(successfulAuth)
//						));
//	}
//	
//	
//	
//	
//}
