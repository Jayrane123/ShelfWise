package com.cdac.entities;


import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admin")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "addedBooks")
public class Admin extends BaseEntity implements UserDetails{



	@Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
   	private UserRole role;
    
    @OneToMany(mappedBy = "addedBy", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Book> addedBooks;
    public Admin(String name, String email, String password, UserRole role, List<Book> addedBooks) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.addedBooks = addedBooks;
	}
    public void addFoodItem(Book book)
	{
		this.addedBooks.add(book);//restaurant -> food item
		book.setAddedBy(this);//food item -> restaurant
	}
    public void removeFoodItem(Book book)
	{
		this.addedBooks.remove(book);
		book.setAddedBy(null);
	}
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(this.role.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

}