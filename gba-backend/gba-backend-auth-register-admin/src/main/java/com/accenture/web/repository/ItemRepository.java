package com.accenture.web.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.accenture.web.entities.Item;



@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{

}
