package com.cdac.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entities.Admin;

public interface AdminDao extends JpaRepository<Admin,Long>{

	boolean existsByEmail(String email);

	Optional<Admin> findByEmail(String email);

	

}
