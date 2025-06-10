package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByAvailableTrue();
//	List<Book> findByAvailableFalse();

	
//	List<Book> findByBorrowedBy(User user);
	@Query("SELECT b FROM Book b WHERE b.borrowedBy.id = :userId")
	List<Book> findByBorrowedById(@Param("userId") Long userId);


}