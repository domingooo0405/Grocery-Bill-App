package com.accenture.web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accenture.web.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
}
