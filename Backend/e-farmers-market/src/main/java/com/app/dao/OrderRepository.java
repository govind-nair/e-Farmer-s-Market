package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

	List<Order> findByBuyers_Id(int buyerId);

}
