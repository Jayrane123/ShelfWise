package com.cdac.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


import com.cdac.entities.Book;
import com.cdac.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserIdDTO {
	
	private Long id;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate creationDate;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
	private String name;

    private String email;

    private String password;
    private UserRole role; 
    //private List<Book> borrowedBooks;
}
