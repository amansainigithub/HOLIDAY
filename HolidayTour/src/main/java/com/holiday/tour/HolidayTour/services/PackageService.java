package com.holiday.tour.HolidayTour.services;


import com.holiday.tour.HolidayTour.entity.PackageEntity;
import com.holiday.tour.HolidayTour.repositories.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository repository;

    public PackageEntity savePackage(PackageEntity pkg) {

        // DAYS
        if (pkg.getDaysList() != null) {
            pkg.getDaysList().forEach(day -> {
                day.setPackageEntity(pkg);

                if (day.getSlots() != null) {
                    day.getSlots().forEach(slot -> {
                        slot.setDay(day);

                        if (slot.getHotel() != null) {
                            slot.getHotel().setSlot(slot);
                        }
                    });
                }
            });
        }

        // IMAGES 🔥
        if (pkg.getImages() != null) {
            pkg.getImages().forEach(img -> img.setPackageEntity(pkg));
        }

        // INCLUSIONS
        if (pkg.getInclusions() != null) {
            pkg.getInclusions().forEach(i -> i.setPackageEntity(pkg));
        }

        // EXCLUSIONS
        if (pkg.getExclusions() != null) {
            pkg.getExclusions().forEach(e -> e.setPackageEntity(pkg));
        }

        return repository.save(pkg);
    }

    public List<PackageEntity> getAll() {
        return repository.findAll();
    }
}