import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-package-component',
  standalone: false,
  templateUrl: './package-component.html',
  styleUrl: './package-component.css',
})
export class PackageComponent {


  packageForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.getEngineX();
    this.initForm();
  }


  getEngineX()
  {
    this.http.get('http://localhost:8080/api/packages/getEngineX')
      .subscribe(res => {
        alert('Saved Successfully ✅');
        console.log(res);
      });
  }

  initForm() {
    this.packageForm = this.fb.group({
      title: [''],
      description: [''],
      days: [0],
      nights: [0],
      fromCity: [''],
      startDate: [''],

      adultPrice: [0],
      childPrice: [0],
      totalPrice: [0],
      discountPrice: [0],

      rooms: [0],
      adults: [0],
      children: [0],

      images: this.fb.array([]),
      inclusions: this.fb.array([]),
      exclusions: this.fb.array([]),
      daysList: this.fb.array([])
    });
  }

  // getters
  get images() { return this.packageForm.get('images') as FormArray; }
  get inclusions() { return this.packageForm.get('inclusions') as FormArray; }
  get exclusions() { return this.packageForm.get('exclusions') as FormArray; }
  get daysList() { return this.packageForm.get('daysList') as FormArray; }

  // IMAGE
  addImage() {
    this.images.push(this.fb.group({
      url: [''],
      altText: [''],
      isPrimary: [false],
      displayOrder: [0],
      imageType: ['COVER']
    }));
  }

  removeImage(i:number){
    this.images.removeAt(i);
  }

  // INCLUSION
  addInclusion() {
    this.inclusions.push(this.fb.group({
      title: [''],
      description: ['']
    }));
  }

  removeInclusion(i:number){
    this.inclusions.removeAt(i);
  }

  // EXCLUSION
  addExclusion() {
    this.exclusions.push(this.fb.group({
      title: [''],
      description: ['']
    }));
  }

  removeExclusion(i:number){
    this.exclusions.removeAt(i);
  }

  // DAY
  addDay() {
    this.daysList.push(this.fb.group({
      title: [''],
      slots: this.fb.array([])
    }));
  }

  removeDay(i:number){
    this.daysList.removeAt(i);
  }

  // SLOT
  addSlot(dayIndex: number) {
    const slots = this.daysList.at(dayIndex).get('slots') as FormArray;

    slots.push(this.fb.group({
      startTime: [''],
      endTime: [''],
      activity: [''],

      hotel: this.fb.group({
        hotelName: [''],
        city: [''],
        location: [''],
        hotelType: [''],
        starRating: [''],
        roomType: [''],
        rooms: [0],
        checkIn: [''],
        checkOut: [''],
        pricePerNight: [0],
        totalNights: [0],
        wifi: [false],
        ac: [false],
        pool: [false],
        contact: [''],
        googleMapLink: ['']
      })
    }));
  }

  removeSlot(dayIndex:number, slotIndex:number){
    const slots = this.daysList.at(dayIndex).get('slots') as FormArray;
    slots.removeAt(slotIndex);
  }

  submit() {
    console.log(this.packageForm.value);

    this.http.post('http://localhost:8080/api/packages/create', this.packageForm.value)
      .subscribe(res => {
        alert('Saved Successfully ✅');
        console.log(res);
      });
  }


getSlots(dayIndex: number): FormArray {
  return this.daysList.at(dayIndex).get('slots') as FormArray;
}
}
