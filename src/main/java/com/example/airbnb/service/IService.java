package com.example.airbnb.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    T save(T t);

    void remove(Long id);

}