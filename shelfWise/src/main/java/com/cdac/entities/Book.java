package com.cdac.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "book")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "borrowedBy")
public class Book extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private boolean available;

    @ManyToOne
    @JoinColumn(name = "borrowed_by")
    private User borrowedBy;

    
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin addedBy;
    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "due_date")
    private LocalDate dueDate;
//    private String dueDate;


    public Book(String title, String author, boolean available, User borrowedBy, Admin addedBy, int daysUntilDue) {
        this.title = title;
        this.author = author;
        this.available = available;
        this.borrowedBy = borrowedBy;
        this.addedBy = addedBy;
        this.issueDate = LocalDate.now(); // set today
        this.dueDate = this.issueDate.plusDays(daysUntilDue); // add days
    }


    
}
