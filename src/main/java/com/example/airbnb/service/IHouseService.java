package com.example.airbnb.service;

import com.example.airbnb.model.House;



public interface IHouseService extends IService<House>{
    Iterable<House>findAllByNameContain(String name);
}
