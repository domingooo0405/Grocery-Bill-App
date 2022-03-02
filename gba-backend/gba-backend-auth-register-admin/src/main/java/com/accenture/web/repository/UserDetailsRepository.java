package com.accenture.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.accenture.web.entities.User;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long>{

	User findByUserName(String userName);
}
