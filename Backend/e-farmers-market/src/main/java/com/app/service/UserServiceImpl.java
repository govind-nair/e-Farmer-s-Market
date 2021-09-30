package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.UserHandlingException;
import com.app.dao.UserRepository;
import com.app.pojos.User;

@Transactional
@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository userRepo;
	
	
	@Override
	public User userLogin(String email, String password) {
		
		User user= userRepo.findByEmailAndPassword(email,password);
		if(user==null || user.getStatus()==1)
			throw new RuntimeException();
		return user;
		
		
	}
	@Override
	public User addUser(User user) {
		
		return userRepo.save(user);
	}

	@Override
	public String deleteUser(int userId) {
		User user=getDetails(userId);
		user.setStatus(1);
		return "User deleted user Id "+userId;
	}

	@Override
	public User getDetails(int userId) {
		
	User user=	userRepo.findById(userId).orElseThrow(()-> new UserHandlingException("User Invalid"));

	return user;
		
	}

	@Override
	public User updateDetails(User detachedUser,int id) {
		System.out.println("Hello");
		User user=getDetails(id);
		System.out.println("Hello1");
		user.setPassword(detachedUser.getPassword());
		System.out.println("Hello2");
		user.setCity(detachedUser.getCity());
		System.out.println("Hello3");
		user.setState(detachedUser.getState());
	
		System.out.println("Hello5");
		user.setContactNo(detachedUser.getContactNo());
		System.out.println("Hello6");
		return userRepo.save(user);
	}
}
