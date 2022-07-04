package com.example.airbnb.repository;

import com.example.airbnb.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product,Long> {   Iterable<Product> findAllByOrderByPrice();

    Iterable<Product> findAllByPriceBetween(int from, int to);

    @Query(value = "select * from product order by id desc  limit 4", nativeQuery = true)
    Iterable<Product> findTop4New();
}


