package com.holiday.tour.HolidayTour.controllers;


import com.holiday.tour.HolidayTour.entity.PackageEntity;
import com.holiday.tour.HolidayTour.services.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PackageController {

    private final PackageService service;

    @PostMapping
    public ResponseEntity<?> createPackage(@RequestBody PackageEntity pkg) {
        return ResponseEntity.ok(service.savePackage(pkg));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}