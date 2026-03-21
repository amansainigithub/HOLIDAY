package com.holiday.tour.HolidayTour.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "packages")
@Data
public class PackageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int days;
    private int nights;
    private String fromCity;
    private LocalDate startDate;

    private double adultPrice;
    private double childPrice;
    private double totalPrice;
    private double discountPrice;

    private int rooms;
    private int adults;
    private int children;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DayEntity> daysList;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PackageImage> images;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inclusion> inclusions;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exclusion> exclusions;
}