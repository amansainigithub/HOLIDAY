package com.holiday.tour.HolidayTour.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "package_exclusions")
@Data
public class Exclusion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private PackageEntity packageEntity;
}
