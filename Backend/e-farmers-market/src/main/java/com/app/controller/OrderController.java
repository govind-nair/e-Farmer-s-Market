package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Order;
import com.app.service.IOrderService;
@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private IOrderService orderService;
	
	@GetMapping("/{id}")
	public List<Order> fetchOrdersByUserId(@PathVariable int id){
		System.out.println("Order");
		System.out.println(id);
		return orderService.listOrders(id);
	}

}
