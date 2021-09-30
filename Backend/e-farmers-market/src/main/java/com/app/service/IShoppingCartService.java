package com.app.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@Transactional
public interface IShoppingCartService {
String addItems(int buyerId,int cropId,int quantity,double price);
}
