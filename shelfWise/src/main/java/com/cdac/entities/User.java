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
@Table(name = "user")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "borrowedBy")
public class User extends BaseEntity implements UserDetails{
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
   	@Column(name = "user_role")
   	private UserRole role;
 // If you want to associate with a list of transactions or reviews, define them here
    @OneToMany(mappedBy = "borrowedBy", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Book> borrowedBooks;
	public User(String name, String email, String password, UserRole role, List<Book> borrowedBooks) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.borrowedBooks = borrowedBooks;
	}
	public void removeFoodItem(Book book)
	{
		this.borrowedBooks.remove(book);
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