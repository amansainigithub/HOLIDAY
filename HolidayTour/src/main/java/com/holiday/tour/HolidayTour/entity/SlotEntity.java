package com.holiday.tour.HolidayTour.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Entity
@Table(name = "slots")
@Data
public class SlotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime startTime;
    private LocalTime endTime;
    private String activity;

    @ManyToOne
    @JoinColumn(name = "day_id")
    private DayEntity day;

    @OneToOne(mappedBy = "slot", cascade = CascadeType.ALL, orphanRemoval = true)
    private HotelEntity hotel;
}