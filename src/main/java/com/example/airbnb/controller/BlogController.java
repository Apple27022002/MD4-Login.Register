package com.example.airbnb.controller;

import com.example.airbnb.model.Blog;
import com.example.airbnb.repository.BlogRepository;
import com.example.airbnb.service.IBlogService;
import com.example.airbnb.service.impl.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("/blogs")
public class BlogController {
       @Autowired
       private IBlogService blogService;

        @GetMapping
        public ResponseEntity<Iterable<Blog>> findAll() {
            return new ResponseEntity<>(blogService.findAll(), HttpStatus.OK);
        }
        @PostMapping
        public ResponseEntity<Blog> create(@RequestBody Blog blog) {
            blogService.save(blog);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Blog> update(@PathVariable Long id,@RequestBody Blog blog) {
            Optional<Blog> productOptional = blogService.findById(id);
            if (!productOptional.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            blog.setId(productOptional.get().getId());
            blog.setStatus(1);
            blogService.save(blog);
            return new ResponseEntity<>(blog,HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Optional<Blog>> showUserBlog(@PathVariable Long id) {
            return new ResponseEntity<>(blogService.findById(id),HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Blog> delete(@PathVariable Long id){
            blogService.remove(id);
            return new ResponseEntity<>(HttpStatus.OK);

    }



}

