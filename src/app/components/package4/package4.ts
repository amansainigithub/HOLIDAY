import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package4',
  standalone: false,
  templateUrl: './package4.html',
  styleUrl: './package4.css',
})
export class Package4 {
 packageForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.packageForm = this.fb.group({
      packageTitle: ['', [
                          Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(100),
                          Validators.pattern(/^[a-zA-Z0-9\s\-&()]+$/) // special chars restrict
                        ]],
      startDate: [''], // 👈 ADD THIS
      days: this.fb.array([])
    });

    this.addDay(); // default 1 day


    // 👇 API simulate
  setTimeout(() => {
    this.patchForm(this.sampleData);
  }, 2000);
  }

  // ===== DAYS =====
  get days(): FormArray {
    return this.packageForm.get('days') as FormArray;
  }

  createDay(): FormGroup {
  return this.fb.group({
    dayTitle: ['', Validators.required],
    date: ['', Validators.required], // 👈 NEW FIELD
    items: this.fb.array([])
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

activeTab: string = 'info';
selectedDayIndex = 0;


selectDay(index: number) {
  this.selectedDayIndex = index;
}

addDay() {
  const day = this.createDay();
  this.days.push(day);

  // default ek item (slot) open hoga
   this.addItem(this.days.length - 1, 'TRAVEL');
  this.addItem(this.days.length - 1, 'SIGHTSEEING');
}

createItem(type: string): FormGroup {

  if (type === 'TRAVEL') {
    return this.fb.group({
      type: [type],
      from: ['', Validators.required],
      to: ['', Validators.required],
      mode: [''], // bus / flight / cab
      time: ['', Validators.required]
    });
  }

  if (type === 'HOTEL') {
    return this.fb.group({
      type: [type],
      hotelName: ['', Validators.required],
      city: ['', Validators.required],
      checkIn: [''],
      checkOut: ['']
    });
  }

  if (type === 'SIGHTSEEING') {
    return this.fb.group({
      type: [type],
      placeName: ['', Validators.required],
      description: [''],
      time: ['']
    });
  }

  if (type === 'ACTIVITY') {
    return this.fb.group({
      type: [type],
      activityName: ['', Validators.required],
      duration: [''],
      vendor: ['']
    });
  }

  return this.fb.group({});
}

getItems(dayIndex: number): FormArray {
  return this.days.at(dayIndex).get('items') as FormArray;
}

addItem(dayIndex: number, type: string) {
  this.getItems(dayIndex).push(this.createItem(type));
}

  removeDay(index: number) {
  this.days.removeAt(index);

  if (this.selectedDayIndex >= this.days.length) {
    this.selectedDayIndex = this.days.length - 1;
  }

  if (this.days.length === 0) {
    this.addDay(); // optional safeguard
  }
}


removeItem(dayIndex: number, itemIndex: number) {
  this.getItems(dayIndex).removeAt(itemIndex);
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

  getDayForm(index: number): FormGroup {
  return this.days.at(index) as FormGroup;
}



























  // ===== SUBMIT =====
onSubmit() {
  if (this.packageForm.invalid) {
    this.packageForm.markAllAsTouched();

    this.formErrors = this.getFormErrors(); // 👈 collect errors
    return;
  }

  this.formErrors = [];
  console.log(this.packageForm.value);
}
  


  formErrors: string[] = [];

getFormErrors(): string[] {
  const errors: string[] = [];

  // ===== PACKAGE INFO TAB =====
  const title = this.packageForm.get('packageTitle');
  if (title?.invalid) {
    errors.push('Package Info → Package Title');
  }

  // ===== ITINERARY TAB =====
  this.days.controls.forEach((day, i) => {
    const dayIndex = i + 1;

    if (day.get('dayTitle')?.invalid) {
      errors.push(`Itinerary → Day ${dayIndex} Title`);
    }

    if (day.get('date')?.invalid) {
      errors.push(`Itinerary → Day ${dayIndex} Date`);
    }

    const items = day.get('items') as FormArray;

    items.controls.forEach((item, j) => {
      const itemIndex = j + 1;

      if (item.get('name')?.invalid) {
        errors.push(`Itinerary → Day ${dayIndex} Item ${itemIndex} Name`);
      }

      if (item.get('vendor')?.invalid) {
        errors.push(`Itinerary → Day ${dayIndex} Item ${itemIndex} Vendor`);
      }

      if (item.get('time')?.invalid) {
        errors.push(`Itinerary → Day ${dayIndex} Item ${itemIndex} Time`);
      }
    });
  });

  return errors;
}










































sampleData = {
  packageTitle: "Dehradun Package",
  startDate: "2026-03-25",
  days: [
    {
      dayTitle: "day 1 masti bazi",
      date: "2026-03-24",
      items: [
        {
          type: "TRAVEL",
          from: "calvin hotel ",
          to: "mahadevi hotel",
          mode: "BUS",
          time: "02:40"
        },
        {
          type: "SIGHTSEEING",
          placeName: "snowfall",
          description: "desasjnshkjd dsfdfs",
          time: "12:21"
        },
        {
          type: "HOTEL",
          hotelName: "vabhav hotes 5 start rating",
          city: "dehradun",
          checkIn: "2026-03-25",
          checkOut: "2026-03-26"
        },
        {
          type: "ACTIVITY",
          activityName: "night activity",
          duration: "5 hourds",
          vendor: "Aman Saini"
        },
        {
          type: "TRAVEL",
          from: "travel 2 day 1",
          to: "maha shiv temple",
          mode: "bus",
          time: "11:11"
        },
        {
          type: "SIGHTSEEING",
          placeName: "pahal dun das",
          description: "sasasasa",
          time: "12:21"
        }
      ]
    },
    {
      dayTitle: "day 2 to mussorie",
      date: "2026-03-25",
      items: [
        {
          type: "TRAVEL",
          from: "dehradun",
          to: "mussorie",
          mode: "FLIGHT",
          time: "12:21"
        },
        {
          type: "SIGHTSEEING",
          placeName: "villager",
          description: "sdajdsdkak",
          time: "12:21"
        },
        {
          type: "HOTEL",
          hotelName: "plain castel hotel ",
          city: "mussorie ",
          checkIn: "2026-03-18",
          checkOut: "2026-03-19"
        },
        {
          type: "ACTIVITY",
          activityName: "fire activity night 12",
          duration: "5",
          vendor: "ishu suryavanshi"
        }
      ]
    }
  ]
}

patchForm(data: any) {

  // reset form
  this.packageForm.patchValue({
    packageTitle: data.packageTitle,
    startDate: data.startDate
  });

  this.days.clear();

  data.days.forEach((d: any) => {

    const dayGroup = this.createDay();
    this.days.push(dayGroup);

    dayGroup.patchValue({
      dayTitle: d.dayTitle,
      date: d.date
    });

    const itemsArray = dayGroup.get('items') as FormArray;

    d.items.forEach((item: any) => {

      const itemGroup = this.createItem(item.type);

      itemGroup.patchValue(item);

      itemsArray.push(itemGroup);

    });

  });

  this.selectedDayIndex = 0;
}

  
}
