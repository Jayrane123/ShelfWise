package com.cdac.controller;

import com.cdac.dto.BookDTO;
import com.cdac.dto.BookIdDTO;
import com.cdac.dto.IssueBookRequest;
import com.cdac.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    
    @PostMapping("/add")
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.createBook(bookDTO));
    }

   
    @PutMapping("/update/{id}")
    public ResponseEntity<BookIdDTO> updateBook(@PathVariable Long id, @Valid @RequestBody BookIdDTO bookDTO) {
        return ResponseEntity.ok(bookService.updateBook(id, bookDTO));
    }

   
    @GetMapping("/get")
    public ResponseEntity<List<BookIdDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }
    @GetMapping("/getall")
    public ResponseEntity<List<BookIdDTO>> getBooks() {
    	return ResponseEntity.ok(bookService.getBooks());
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/softdelete/{id}")
    public ResponseEntity<String> softDeleteBook(@PathVariable Long id) {
        System.out.println("in delete " + id);
        bookService.softDeleteBook(id); // this method should handle the logic
        return ResponseEntity.ok("Book with ID " + id + " soft-deleted successfully.");
    }
    @GetMapping("/available/{id}")
    public ResponseEntity<String> available(@PathVariable Long id) {
    	System.out.println("in delete " + id);
    	bookService.available(id); // this method should handle the logic
    	return ResponseEntity.ok("Book with ID " + id + " is available to issue.");
    }
    @GetMapping("/issued/user/{email}")
    public ResponseEntity<List<BookIdDTO>> getBooksByUserEmail(@PathVariable String email) {
        return ResponseEntity.ok(bookService.getBooksByUserEmail(email));
    }
    @PostMapping("/issue")
    public ResponseEntity<String> issueBook(@RequestBody IssueBookRequest request) {
        bookService.issueBookToUser(request.getBookId(), request.getUserEmail());
        return ResponseEntity.ok("Book issued successfully");
    }




}