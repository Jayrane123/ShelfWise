package com.cdac.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.custom_exceptions.ApiException;

import com.cdac.dao.Userdao;
import com.cdac.dto.AddUserDTO;
import com.cdac.dto.BookIdDTO;
import com.cdac.dto.UserDTO;
import com.cdac.dto.UserIdDTO;
import com.cdac.entities.User;
@Service
@Transactional
public class UserServiceImp implements UserService {
	@Autowired
	private Userdao userDao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public UserDTO addUser(AddUserDTO reqDTO) {
			// 1. check for dup email
			if(userDao.existsByEmail(reqDTO.getEmail()))
				throw new ApiException("Dup email detected !!!!!!");
			//2. req dto -> entity (de ser)
			User entity=modelMapper.map(reqDTO, User.class);
			
			//encrypt password
			entity.setPassword(encoder.encode(entity.getPassword()));
			//3. save -> persistent entity -> resp dto (ser) 
			return modelMapper.map(userDao.save(entity),UserDTO.class);
	}

	@Override
	public List<UserIdDTO> getAllUsers() {
		return userDao.findAll() //List<Entity>
				.stream() //Stream<Entity>
				.map(entity -> modelMapper.map(entity, UserIdDTO.class)) //Stream<DTO>
				.toList();
	}

}
