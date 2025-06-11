package com.cdac.dto;

import java.util.List;

import com.cdac.entities.Book;
import com.cdac.entities.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAdminDTO {
	private String name;

    private String email;
    private UserRole role; 

    private String password;
    private Long mobile;
    private String address;
}
