package com.app.service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CropRepository;
import com.app.dao.ShoppingCartRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Crop;
import com.app.pojos.ShoppingCart;
import com.app.pojos.User;

@Service
@Transactional
public class ShoppingCartService implements IShoppingCartService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private CropRepository cropRepo;
	@Autowired
	private ShoppingCartRepository shoppingCartRepo;

	@Override
	public String addItems(int buyerId, int cropId, int quantity,double price) {
		int i=0;
		System.out.println("In service layer "+i++);
	
		ShoppingCart sc = new ShoppingCart(quantity, LocalDate.now());//creating obj of shopping cart
		User user = userRepo.getById(buyerId);//getting buyers details
		Crop crop = cropRepo.getById(cropId);//getting crop details
		crop.setQuantity(crop.getQuantity()-quantity);//updating crop quantity in crop tables;
		sc.setPrice(crop.getPrice());//setting price of each crop in shopping cart table
		cropRepo.save(crop);//persisting crop state in coprs tables
		sc.setBuyer(user);//setting buyer for newly created shopping cart
		Set<Crop> crops = new HashSet<>();
		crops.add(crop);//setting crop id for sc
		sc.setCrops(crops);
		sc.setPrice(price);
		shoppingCartRepo.save(sc);
	
		return "Order Successful";
	}

}
