import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package3',
  standalone: false,
  templateUrl: './package3.html',
  styleUrl: './package3.css',
})
export class Package3 {
  packageForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.packageForm = this.fb.group({
      packageTitle: ['', Validators.required],
      days: this.fb.array([])
    });

    this.addDay(); // default 1 day
  }

  // ===== DAYS =====
  get days(): FormArray {
    return this.packageForm.get('days') as FormArray;
  }

  createDay(): FormGroup {
  return this.fb.group({
    dayTitle: ['', Validators.required],
    date: ['', Validators.required], // 👈 NEW FIELD
    slots: this.fb.array([])
  });
}

startDate!: string;

onStartDateChange(event: any) {
  this.startDate = event.target.value;

  this.days.controls.forEach((day, index) => {
    const date = new Date(this.startDate);
    date.setDate(date.getDate() + index);

    day.get('date')?.setValue(this.formatDate(date));
  });
}

formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

selectedDayIndex = 0;

selectDay(index: number) {
  this.selectedDayIndex = index;
}

  addDay() {
    const day = this.createDay();
    this.days.push(day);

    // default 1 slot inside each day
    this.addSlot(this.days.length - 1);
  }

  removeDay(index: number) {
    this.days.removeAt(index);
  }

  // ===== SLOTS =====
  createSlot(): FormGroup {
    return this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      activity: ['', Validators.required],
      hotel: this.fb.group({
        hotelName: [''],
        city: ['']
      })
    });
  }

  getSlots(dayIndex: number): FormArray {
    return this.days.at(dayIndex).get('slots') as FormArray;
  }

  addSlot(dayIndex: number) {
    this.getSlots(dayIndex).push(this.createSlot());
  }

  removeSlot(dayIndex: number, slotIndex: number) {
    this.getSlots(dayIndex).removeAt(slotIndex);
  }




  // ===== SUBMIT =====
  onSubmit() {
    console.log(this.packageForm.value);
  }
  


 


}
