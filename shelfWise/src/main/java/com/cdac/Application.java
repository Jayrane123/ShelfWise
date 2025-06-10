package com.cdac;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdac.dto.BookDTO;
import com.cdac.dto.BookIdDTO;
import com.cdac.entities.Book;

@SpringBootApplication //=@Configuration + @EnableAutoConfig +@CompScan
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	ModelMapper mapper() {
	    ModelMapper modelMapper = new ModelMapper();
	    modelMapper.getConfiguration()
	        .setMatchingStrategy(MatchingStrategies.STRICT)
	        .setPropertyCondition(Conditions.isNotNull());

	    // ✅ BookDTO → Book (for add/update)
	    modelMapper.typeMap(BookDTO.class, Book.class).setConverter(ctx -> {
	        BookDTO dto = ctx.getSource();
	        Book book = new Book();

	        book.setId(dto.getId()); // if needed for update
	        book.setTitle(dto.getTitle());
	        book.setAuthor(dto.getAuthor());
	        book.setAvailable(dto.isAvailable());
	        book.setIssueDate(LocalDate.now());
	        book.setDueDate(LocalDate.now().plusDays(dto.getDueDate()));

	        return book;
	    });

	    // ✅ Book → BookDTO (reverse, optional)
	    modelMapper.typeMap(Book.class, BookDTO.class)
	        .addMappings(mapper -> mapper.skip(BookDTO::setDueDate)) // prevent LocalDate → int error
	        .setPostConverter(ctx -> {
	            Book entity = ctx.getSource();
	            BookDTO dto = ctx.getDestination();

	            dto.setId(entity.getId());
	            dto.setTitle(entity.getTitle());
	            dto.setAuthor(entity.getAuthor());
	            dto.setAvailable(entity.isAvailable());

	            if (entity.getIssueDate() != null && entity.getDueDate() != null) {
	                int days = (int) ChronoUnit.DAYS.between(entity.getIssueDate(), entity.getDueDate());
	                dto.setDueDate(days);
	            }

	            return dto;
	        });

	    // ✅ Book → BookIdDTO (for GET requests)
	    modelMapper.typeMap(Book.class, BookIdDTO.class)
	        .addMappings(mapper -> mapper.skip(BookIdDTO::setDueDate))
	        .setPostConverter(ctx -> {
	            Book entity = ctx.getSource();
	            BookIdDTO dto = ctx.getDestination();

	            dto.setId(entity.getId());
	            dto.setTitle(entity.getTitle());
	            dto.setAuthor(entity.getAuthor());
	            dto.setAvailable(entity.isAvailable());

	            if (entity.getIssueDate() != null && entity.getDueDate() != null) {
	                int days = (int) ChronoUnit.DAYS.between(entity.getIssueDate(), entity.getDueDate());
	                dto.setDueDate(days);
	            }

	            return dto;
	        });

	    return modelMapper;
	}


	//configure PasswordEncoder as a spring bean 
	//- as the dependency of DaoAuthProvider
	// used to encrypt (SHA) incoming password
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
