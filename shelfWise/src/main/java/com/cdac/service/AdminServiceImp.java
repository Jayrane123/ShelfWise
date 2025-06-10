package com.cdac.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.custom_exceptions.ApiException;
import com.cdac.dao.AdminDao;
import com.cdac.dto.UserDTO;
import com.cdac.entities.Admin;
import com.cdac.dto.AddAdminDTO;
import com.cdac.dto.AdminDTO;
@Service
@Transactional
public class AdminServiceImp implements AdminService{
	@Autowired
	private AdminDao admindao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PasswordEncoder encoder;
	@Override
	public AdminDTO addAdmin(AddAdminDTO reqDTO) {
		if(admindao.existsByEmail(reqDTO.getEmail()))
			throw new ApiException("Dup email detected !!!!!!");
		//2. req dto -> entity (de ser)
		Admin entity=modelMapper.map(reqDTO, Admin.class);
		//encrypt password
		entity.setPassword(encoder.encode(entity.getPassword()));
		
		//3. save -> persistent entity -> resp dto (ser) 
		return modelMapper.map(admindao.save(entity),AdminDTO.class);
	}

	

}
