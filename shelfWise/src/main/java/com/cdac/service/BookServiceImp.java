package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dao.BookRepository;
import com.cdac.dao.Userdao;
import com.cdac.dto.BookDTO;
import com.cdac.dto.BookIdDTO;
import com.cdac.entities.Book;
import com.cdac.entities.User;

@Service
@Transactional
public class BookServiceImp implements BookService{

    private final ModelMapper modelMapper;

    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private Userdao userDao;

    BookServiceImp(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public BookDTO createBook(BookDTO bookDTO) {
//        Book book = new Book();
//        book.setTitle(bookDTO.getTitle());
//        book.setAuthor(bookDTO.getAuthor());
//        book.setAvailable(bookDTO.isAvailable());
//        book = bookRepository.save(book);
//        bookDTO.setId(book.getId());
//        return bookDTO;
    	Book book = modelMapper.map(bookDTO, Book.class);

        // Optionally: set addedBy or borrowedBy if needed here
        // book.setAddedBy(...);

        book = bookRepository.save(book);
        bookDTO.setId(book.getId());
        return bookDTO;
    }

    public BookIdDTO updateBook(Long id, BookIdDTO bookIdDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        book.setTitle(bookIdDTO.getTitle());
        book.setAuthor(bookIdDTO.getAuthor());
        book.setAvailable(bookIdDTO.isAvailable());
        book = bookRepository.save(book);
        bookIdDTO.setId(book.getId());
        return bookIdDTO;
    }

    public List<BookIdDTO> getAllBooks() {      
        return bookRepository.findByAvailableTrue() //List<Entity>
				.stream() //Stream<Entity>
				.map(entity -> modelMapper.map(entity, BookIdDTO.class)) //Stream<DTO>
				.toList();
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
         
        return modelMapper.map(book, BookDTO.class);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(id);
    }

	public void softDeleteBook(Long id) {
		Book book = bookRepository.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

		    book.setAvailable(false); 
		    bookRepository.save(book);
		
	}

	@Override
	public void available(Long id) {
		Book book = bookRepository.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

		    book.setAvailable(true); 
		    bookRepository.save(book);
		
	}

	@Override
	public List<BookIdDTO> getBooks() {
		 return bookRepository.findAll() //List<Entity>
					.stream() //Stream<Entity>
					.map(entity -> modelMapper.map(entity, BookIdDTO.class)) //Stream<DTO>
					.toList();
	}

//	@Override
//	public List<BookIdDTO> getBooksByUserEmail(String email) {
//	    User user = userDao.findByEmail(email)
//	        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//	    
//	    List<Book> books = bookRepository.findByBorrowedBy(user);
//	    return books.stream()
//	                .map(book -> modelMapper.map(book, BookIdDTO.class))
//	                .collect(Collectors.toList());
//	}
//	@Override
//	public List<BookIdDTO> getBooksByUserEmail(String email) {
//	    User user = userDao.findByEmail(email)
//	        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//	    Long userId = user.getId();
//	    List<Book> books = bookRepository.findAll().stream()
//	        .filter(book -> book.getBorrowedBy() != null && book.getBorrowedBy().getId().equals(userId))
//	        .toList();
//
//	    return books.stream()
//	        .map(book -> modelMapper.map(book, BookIdDTO.class))
//	        .collect(Collectors.toList());
//	}
	@Override
	public List<BookIdDTO> getBooksByUserEmail(String email) {
	    User user = userDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    List<Book> books = bookRepository.findByBorrowedById(user.getId());

	    return books.stream()
	        .map(book -> modelMapper.map(book, BookIdDTO.class))
	        .collect(Collectors.toList());
	}

	@Override
	public void issueBookToUser(Long bookId, String userEmail) {
	    Book book = bookRepository.findById(bookId)
	        .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
	    User user = userDao.findByEmail(userEmail)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    book.setBorrowedBy(user);
	    book.setAvailable(false); // soft delete behavior

	    bookRepository.save(book);
	}


}
