package com.example.airbnb.controller;

import com.example.airbnb.model.House;
import com.example.airbnb.service.IHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping ("/houses")
@Controller
public class HouseController {
    @Autowired
    IHouseService iHouseService;

//
//    @GetMapping("")
//    public ResponseEntity<Iterable<House>> findAll() {
//        return new ResponseEntity<>(iHouseService.findAll(), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<Iterable<House>>findAll(){
        List<House> houses = (List<House>) iHouseService.findAll();
        if (houses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(houses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<House> findHouseById(@PathVariable Long id) {
        Optional<House> houseOptional = iHouseService.findById(id);
        if (!houseOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(houseOptional.get(), HttpStatus.OK);
    }
//
    @PutMapping("/{id}")
    public ResponseEntity<House> update(@RequestParam("fileEdit") MultipartFile file, @PathVariable Long id, House house) {
        Optional<House> houseOptional = iHouseService.findById(id);
        if(!houseOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String fileName = file.getOriginalFilename();
        house.setImage(fileName);
        try {
            file.transferTo(new File("C:\\Users\\chopp\\Desktop\\MD4new\\AJAX-product-mangament\\src\\main\\resources\\templates\\photos\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        house.setId(houseOptional.get().getId());
        iHouseService.save(house);
        return new ResponseEntity<>(house, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<House> deleteHouse(@PathVariable Long id) {
        Optional<House> houseOptional = iHouseService.findById(id);
        if (!houseOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iHouseService.remove(id);
        return new ResponseEntity<>(houseOptional.get(), HttpStatus.NO_CONTENT);
    }


    //        Cái này không save
    @PostMapping
    public ResponseEntity<House> handleFileUpload (@RequestParam("file") MultipartFile file, House house) {
        String fileName = file.getOriginalFilename();
        house.setImage(fileName);
        try {
            file.transferTo(new File("C:\\Users\\chopp\\Desktop\\MD4new\\AJAX-product-mangament\\src\\main\\resources\\templates\\photos\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return new ResponseEntity<>(iHouseService.save(house), HttpStatus.CREATED);
    }

    @GetMapping("/search-name")
    public ResponseEntity<Iterable<House>> findAllByNameContaining(@RequestParam String name) {
        return new ResponseEntity<>(iHouseService.findAllByNameContain(name), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}