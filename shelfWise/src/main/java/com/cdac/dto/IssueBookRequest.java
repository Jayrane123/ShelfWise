package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueBookRequest {
    private Long bookId;
    private String userEmail;
}
