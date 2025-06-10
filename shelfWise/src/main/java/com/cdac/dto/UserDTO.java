package com.cdac.dto;

import java.util.List;


import com.cdac.entities.Book;
import com.cdac.entities.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends BaseDTO{
	private String name;

    private String email;

    private String password;
    private UserRole role; 
    private List<Book> borrowedBooks;
}
