package com.holiday.tour.HolidayTour.repositories;

import com.holiday.tour.HolidayTour.entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
}