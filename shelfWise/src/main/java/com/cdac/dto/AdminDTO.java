package com.cdac.dto;

import java.util.List;

import com.cdac.entities.Book;
import com.cdac.entities.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDTO extends BaseDTO{
	private String name;

    private String email;

    private String password;
    private UserRole role; 
    private List<Book> addedBooks;
}
