package com.accenture.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accenture.web.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	

	User findByUserName(String userName);

}
