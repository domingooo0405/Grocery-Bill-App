package com.accenture.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.model.User;
import com.accenture.web.service.UserServiceImplementation;

@RestController
@RequestMapping ("/api/admin")
public class AdminController {

	@Autowired
	private UserServiceImplementation userServiceImplementation;
	
	@GetMapping("all")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok(userServiceImplementation.findAllUser());
	}
	
	@DeleteMapping("{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable Long userId){
		User user = userServiceImplementation.deleteUser(userId);
		return ResponseEntity.ok(user); 
		
	}
}
