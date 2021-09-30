package com.app.service;

import com.app.pojos.User;

public interface IUserService {
	User addUser(User user);

	String deleteUser(int userId);

	User getDetails(int userId);

	User updateDetails(User detachedUser,int id);

	User userLogin(String email, String password);

}
