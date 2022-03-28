package com.accenture.web.dto;

import javax.validation.constraints.NotBlank;

import com.accenture.web.model.User;

import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class UserDto {
	@NotBlank
	private String name;
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String password;
	
	public User convertToUser() {
		User user = new User();
		user.setName(name);
		user.setUsername(username);
		user.setPassword(password);
		return user;
	}

}
