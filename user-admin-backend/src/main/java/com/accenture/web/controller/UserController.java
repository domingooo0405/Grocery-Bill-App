package com.accenture.web.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.dto.UserDto;
import com.accenture.web.model.Role;
import com.accenture.web.model.User;
import com.accenture.web.service.UserServiceImplementation;

//@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserServiceImplementation userServiceImplementation;

	@PostMapping
	public ResponseEntity<?> register(@RequestBody @Valid UserDto user){
		if(userServiceImplementation.findByUsername(user.getUsername()) != null) {
			return new ResponseEntity<> (HttpStatus.CONFLICT);
		}
		userServiceImplementation.saveUser(user.convertToUser());
		return new ResponseEntity<> (HttpStatus.CREATED);
	}
	@GetMapping("/login")
	public ResponseEntity<?>login(HttpServletRequest request){
		Principal principal = request.getUserPrincipal();
		if(principal==null || principal.getName()==null) {
			return new ResponseEntity <>(HttpStatus.OK);
		}
		User user =userServiceImplementation.findByUsername(principal.getName());
		return new ResponseEntity<>(user, HttpStatus.OK);
		
		
	}
	@PutMapping("/{username}/change/{role}")
	public ResponseEntity<?> changeRole (@PathVariable String username, @PathVariable Role role){
		User user = userServiceImplementation.changeRole(role, username);
		return ResponseEntity.ok(user);
	}
}
