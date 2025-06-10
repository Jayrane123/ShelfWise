package com.cdac.dto;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDTO extends BaseDTO{
    private String title;

    private String author;

    private boolean available;
    
    private int dueDate;
}
