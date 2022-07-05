package com.example.airbnb.repository;

import com.example.airbnb.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.naming.Name;

@Repository
public interface HouseRepository extends JpaRepository<House ,Long> {
    Iterable<House>findAllByNameContaining(String name);
}
