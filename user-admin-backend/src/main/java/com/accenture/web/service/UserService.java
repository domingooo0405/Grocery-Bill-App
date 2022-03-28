package com.accenture.web.service;

import java.util.List;

import com.accenture.web.model.Role;
import com.accenture.web.model.User;

public interface UserService {

	User saveUser(User user);

	User changeRole(Role newRole, String username);

	User findByUsername(String username);

	User deleteUser(Long userId);

	List<User> findAllUser();

}
