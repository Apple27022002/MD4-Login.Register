package com.example.airbnb.service.impl;

import com.example.airbnb.model.Blog;
import com.example.airbnb.repository.BlogRepository;
import com.example.airbnb.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogService implements IBlogService {
    @Autowired
    BlogRepository blogRepository;
    @Override
    public void save(Blog blog) {
        blogRepository.save(blog);

    }

    @Override
    public Iterable<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> findById(Long id) {
        return blogRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        blogRepository.deleteById(id);

    }
}
