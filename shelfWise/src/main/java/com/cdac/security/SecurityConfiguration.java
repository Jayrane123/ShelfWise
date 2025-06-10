package com.cdac.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfiguration {

    private final PasswordEncoder encoder;
    private final JWTCustomFilter jwtCustomFilter;

    @Bean
    SecurityFilterChain configureSecFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .authorizeHttpRequests(auth -> auth

                // public endpoints
                .requestMatchers(
                    "/v*/api-docs/**",
                    "/swagger-ui/**",
                    "/products/view",
                    "/auth/user/signup",
                    "/auth/admin/signup",
                    "/auth/user/signin",
                    "/auth/admin/signin"
                ).permitAll()

                // only ADMIN can add, delete or update books
                .requestMatchers(
                    "/books/add",
                    "/books/delete/**",
                    "/books/update/**"
                ).hasAuthority("ROLE_ADMIN")

                // both USER and ADMIN can fetch or soft delete books
                .requestMatchers(
                    "/books/get/**",
                    "/books/get",
                    "/books/softdelete/**",
                    "/user/getall",
                    "/books/user/books/**",
                    "/books/issued/user/**",
                    "/books/issue"
                ).hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")

                // all other endpoints require authentication
                .anyRequest().authenticated()
            )
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtCustomFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}



//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import lombok.AllArgsConstructor;
//
//@Configuration // to declare the as java config class
//// equivalent to bean config xml file
//@EnableWebSecurity // to enable spring sec config in this class
//@EnableMethodSecurity // to enable method level security
//@AllArgsConstructor
//public class SecurityConfiguration {
//	// depcy
//	private final PasswordEncoder encoder;
//	private final JWTCustomFilter jwtCustomFilter;
//
//	/*
//	 * Configure spring bean (@Bean) to configure spring securtiy filter chain
//	 * 
//	 */
//	@Bean
//	SecurityFilterChain configureSecFilterChain(HttpSecurity http) throws Exception {
//		// disable CSRF protection : since un necessary with stateless REST APIs
//	
//		http.csrf(csrf -> csrf.disable());
//		// form login is enabled by default , to disable it
//		http.formLogin(form -> form.disable());
//				// enable Basic HTTP auth
//			//	.httpBasic(Customizer.withDefaults());
//		// add URL based authorization rules
//		// un protected end points - swagger , view products
//		http.authorizeHttpRequests(request -> request
//				.requestMatchers("/v*/api-docs/**", "/swagger-ui/**", "/products/view","/auth/user/signup", "/auth/admin/signup", "/auth/user/signin", "/auth/admin/signin")
//				.permitAll()
//				// only admin should be allowed to add product
//				.requestMatchers("/books/add","/books/delete/**","/books/update/**").hasRole("ADMIN")
//				// only customer can purchase the product
//				.requestMatchers("/books/get/**","/books/get","/books/softdelete/**").hasRole("USER")
//				// any other request - can accessed only by authenticated users
//				.anyRequest().authenticated())
//				// tell Spring sec - not to create any HttpSession object
//				// to store spring security info
//				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//		//add custom jwt filter before 1st auth filter 
//		http.addFilterBefore(jwtCustomFilter, 
//				UsernamePasswordAuthenticationFilter.class);
//		// HttpSecurity class builds spring sec filter chain , as per above
//		// customizations
//		return http.build();
//	}
//
//	// configure spring bean - auth mgr
//	@Bean
//	AuthenticationManager authenticationManager
//	(AuthenticationConfiguration config) throws Exception {
//		return config.getAuthenticationManager();
//	}
//
//}


