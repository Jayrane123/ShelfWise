package com.cdac.service;


import com.cdac.dto.BookDTO;
import com.cdac.dto.BookIdDTO;

import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {

    BookDTO createBook(BookDTO bookDTO);

    BookIdDTO updateBook(Long id, BookIdDTO bookDTO);

    List<BookIdDTO> getAllBooks();

    BookDTO getBookById(Long id);

    void deleteBook(Long id);

    void softDeleteBook(Long id);

	void available(Long id);

	List<BookIdDTO> getBooks();

	List<BookIdDTO> getBooksByUserEmail(String email);

	void issueBookToUser(Long bookId, String userEmail);
}