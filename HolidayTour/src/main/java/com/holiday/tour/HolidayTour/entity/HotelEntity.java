package com.holiday.tour.HolidayTour.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Entity
@Table(name = "hotels")
@Data
public class HotelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hotelName;
    private String city;
    private String location;

    private String hotelType;
    private String starRating;
    private String roomType;

    private int rooms;
    private LocalTime checkIn;
    private LocalTime checkOut;

    private double pricePerNight;
    private int totalNights;

    private boolean wifi;
    private boolean ac;
    private boolean pool;

    private String contact;
    private String googleMapLink;

    private String email;
    private String website;
    private String cancellationPolicy;
    private String foodPlan;

    private boolean parking;
    private boolean gym;
    private boolean spa;

    @OneToOne
    @JoinColumn(name = "slot_id")
    private SlotEntity slot;
}
