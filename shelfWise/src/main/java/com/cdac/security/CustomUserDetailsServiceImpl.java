package com.cdac.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.AdminDao;
import com.cdac.dao.Userdao;

import lombok.AllArgsConstructor;

//@Service
//@Transactional
//@AllArgsConstructor
//public class CustomUserDetailsServiceImpl implements UserDetailsService {
//	private final Userdao userDao;
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User user=userDao.findByEmail(email)
//				.orElseThrow(() -> 
//				new UsernameNotFoundException("Invalid email ....."));
//		//=> partial auth - email exists
//		return user;
//	}
//}



@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final Userdao userDao;
    private final AdminDao adminDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userDao.findByEmail(email)
            .<UserDetails>map(user -> user)
            .or(() -> adminDao.findByEmail(email).map(admin -> admin))
            .orElseThrow(() -> new UsernameNotFoundException("Invalid email or admin email"));
    }
}
//@Service
//@Transactional
//public class CustomUserDetailsServiceImpl implements UserDetailsService {
//
//    private final Userdao userDao;
//    private final AdminDao adminDao;
//
//    @Autowired
//    public CustomUserDetailsServiceImpl(Userdao userDao, AdminDao adminDao) {
//        this.userDao = userDao;
//        this.adminDao = adminDao;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        return userDao.findByEmail(email)
//                .<UserDetails>map(user -> user)
//                .orElseGet(() ->
//                    adminDao.findByEmail(email)
//                        .<UserDetails>map(admin -> admin)
//                        .orElseThrow(() -> new UsernameNotFoundException("Invalid email"))
//                );
//    }
//}
//
