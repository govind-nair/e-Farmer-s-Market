package com.app.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Crop;
import com.app.pojos.Data;
import com.app.pojos.Order;
import com.app.service.ICropService;
import com.app.service.IOrderService;
import com.app.service.IShoppingCartService;



@RestController
@RequestMapping("/buyer")
@CrossOrigin
public class BuyerController {
@Autowired
private ICropService cropService;
@Autowired
private IShoppingCartService shoppingCartService;
@Autowired
private IOrderService orderService;
@GetMapping()
public List<Crop> fetchAllCropsByUserId(){
	System.out.println("In fetch all crops");
	return cropService.getCrops();
}
@PostMapping("/add-items")
public String addCropsInShoppingCart(@RequestBody Data[] data) {
System.out.println("In add crops shopping cart"+Arrays.toString(data));

for(int i=0;i<data.length;i++)
	 shoppingCartService.addItems(data[i].getBuyerId(),data[i].getCropId(),data[i].getQuantity(),data[i].getTotal());
return "Addition successful";
}

@PostMapping("/order")
public Order placeOrder(@RequestBody Data data ) {
	System.out.println(data);
	
	return orderService.addOrderDetails(data);
	
}
}


