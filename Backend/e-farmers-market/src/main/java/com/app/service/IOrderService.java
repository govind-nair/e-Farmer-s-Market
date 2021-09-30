package com.app.service;

import java.util.List;

import com.app.pojos.Data;
import com.app.pojos.Order;

public interface IOrderService {
Order addOrderDetails(Data data);
List<Order> listOrders(int buyerId);
}
