package com.cdac.dao;

import com.cdac.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface Userdao extends JpaRepository<User, Long> {
    //Optional<User> findByUsername(String email);

	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);
}