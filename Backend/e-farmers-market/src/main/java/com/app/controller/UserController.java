package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.pojos.User;
import com.app.service.IUserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private IUserService userService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserDetails(@PathVariable int userId ) {
		System.out.println(userId);
		// invoke service layers method for (persistence)saving user details
		try {
			System.out.println(userService.getDetails(userId));
			return new ResponseEntity<>(userService.getDetails(userId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Err in add " + e);
		
			return new ResponseEntity<>(new ErrorResponse("User Not Found", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/register")
	public ResponseEntity<?> addNewUserDetails(@RequestBody User transientUser) {
		System.out.println("in add user " + transientUser.getRole());
		// invoke service layers method for (persistence)saving user details
		try {
			return new ResponseEntity<>(userService.addUser(transientUser), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("Err in add " + e);
		
			return new ResponseEntity<>(new ErrorResponse("Adding user failed", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User detachedUser) {
		System.out.println("in login " + detachedUser);
		// invoke service layers method for (persistence)saving user details
		try {
			return new ResponseEntity<>(userService.userLogin(detachedUser.getEmail(), detachedUser.getPassword()), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Err in add " + e);
			return new ResponseEntity<>(new ErrorResponse("Login failed", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUserDetails(@RequestBody User detachedUser,@PathVariable int userId){
		System.out.println("In update user "+userId+" "+detachedUser);
		//invoke service layer method for valdiationg user id
		try{	
		return ResponseEntity.ok(userService.updateDetails(detachedUser,userId));    
	}catch(RuntimeException e){
		System.out.println("Err in add "+e);
		return new ResponseEntity<>(new ErrorResponse("Updating User Failed failed", e.getMessage()) ,HttpStatus.BAD_REQUEST) ;
	}
	}
	@DeleteMapping("/{userId}")
	public ResponseEntity<ResponseDTO> deleteCropDetails(@PathVariable int userId)
	{
		System.out.println("In  delete user details "+userId);
		
			//invoke service layer method for deleting users
		//	return new ResponseEntity<ResponseDTO>(new ResponseDTO ( userService.deleteUser(userId)), HttpStatus.OK);
					
		return ResponseEntity.ok(new ResponseDTO ( userService.deleteUser(userId)));
	}}