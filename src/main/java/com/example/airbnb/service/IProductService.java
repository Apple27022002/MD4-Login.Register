package com.example.airbnb.service;

import com.example.airbnb.model.Product;

public interface IProductService extends IService<Product> {
    Iterable<Product> findAllByOrderByPrice();
    Iterable<Product> findAllByPriceBetween(int from, int to);
}
