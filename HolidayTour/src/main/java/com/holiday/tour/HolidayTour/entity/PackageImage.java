package com.holiday.tour.HolidayTour.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "package_images")
@Data
public class PackageImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String altText;
    private boolean isPrimary;
    private int displayOrder;

    private String imageType; // COVER / HOTEL / ACTIVITY

    @ManyToOne
    @JoinColumn(name = "package_id")
    private PackageEntity packageEntity;
}
