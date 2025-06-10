package com.cdac.service;

import java.util.List;

import com.cdac.dto.AddUserDTO;
import com.cdac.dto.UserDTO;
import com.cdac.dto.UserIdDTO;

public interface UserService {

   UserDTO addUser(AddUserDTO reqDTO);

   List<UserIdDTO> getAllUsers();

}
