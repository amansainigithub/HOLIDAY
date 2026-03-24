import { HttpClient } from '@angular/common/http';
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

  constructor(private fb: FormBuilder , private http:HttpClient) {}

  ngOnInit() {
    this.packageForm = this.fb.group({
      packageTitle: ['', [
                          Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(100),
                          Validators.pattern(/^[a-zA-Z0-9\s\-&()]+$/) // special chars restrict
                        ]],
      startDate: [''], // 👈 ADD THIS
      packageImages: [[]], // 👈 yaha images store hongi
      days: this.fb.array([])
    });

    this.addDay(); // default 1 day


    // 👇 API simulate
  setTimeout(() => {
    this.loadDataFromBackend(this.sampleData);
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

  if (type === 'MEAL') {
  return this.fb.group({
    type: [type],
    mealType: ['', Validators.required], // Breakfast/Lunch/Dinner
    menu: ['', Validators.required],
    time: ['']
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

















// IMAGES=======================================
images: any[] = [];

onFileSelect(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.uploadImage(file);
  }
}

uploadImage(file: File) {

  const formData = new FormData();
  formData.append('file', file);

  this.http.post<any>('YOUR_API_URL', formData).subscribe({
    next: (res) => {

      // EXPECTED RESPONSE
      // { url, fileName, title }

      this.images.push({
        url: res.url,
        fileName: res.fileName,
        title: res.title
      });

    },
    error: () => {

      // 🔥 DUMMY FALLBACK
      const dummy = {
        url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2',
        fileName: file.name,
        title: 'Dummy Image'
      };

      this.images.push(dummy);
    }
  });
}

saveImages() {
  // 👉 Add into main package form
  this.packageForm.patchValue({
    packageImages: this.images
  });

  console.log("Saved Images", this.images);
}


















// ====================================SUBMIT  DATA AND TRANSFORM DATA=============================================================================
  // ===== SUBMIT  DATA AND TRANSFORM DATA=================================================================================
onSubmit() {
  if (this.packageForm.invalid) {
    this.packageForm.markAllAsTouched();
    this.formErrors = this.getFormErrors();
    return;
  }

  console.log(this.packageForm);
  

  // FRONTEND ITEMS → BACKEND CONVERT DATA STRUCTURE
  const transformedDays = this.transformItemsToBackend(this.packageForm.value.days);

  const payload = {
    packageTitle: this.packageForm.value.packageTitle,
    startDate: this.packageForm.value.startDate,
    packageImages: this.packageForm.value.packageImages,
    days: transformedDays
  };

  console.log("Backend Payload:", payload);
  // this.http.post('YOUR_API_URL', payload).subscribe(...)
}




transformItemsToBackend(days: any[]): any[] {
  return days.map(day => {
    const backendDay: any = {
      dayTitle: day.dayTitle,
      date: day.date,
      travels: [],
      hotels: [],
      sightseeing: [],
      activities: [],
      meals: []
    };

    if (day.items && day.items.length > 0) {
      day.items.forEach((item: any) => {
        switch(item.type) {
          case 'TRAVEL':
            backendDay.travels.push({
              from: item.from,
              to: item.to,
              mode: item.mode,
              time: item.time
            });
            break;

          case 'HOTEL':
            backendDay.hotels.push({
              hotelName: item.hotelName,
              city: item.city,
              checkIn: item.checkIn,
              checkOut: item.checkOut
            });
            break;

          case 'SIGHTSEEING':
            backendDay.sightseeing.push({
              placeName: item.placeName,
              description: item.description,
              time: item.time
            });
            break;

          case 'ACTIVITY':
            backendDay.activities.push({
              activityName: item.activityName,
              duration: item.duration,
              vendor: item.vendor
            });
            break;

          case 'MEAL':
            backendDay.meals.push({
              mealType: item.mealType,
              menu: item.menu,
              time: item.time
            });
            break;

          default:
            break;
        }
      });
    }

    return backendDay;
  });
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

// ========================================SUBMIT  DATA AND TRANSFORM DATA=========================================
// ========================================SUBMIT  DATA AND TRANSFORM DATA=========================================

































// ==================== BACKEND → FORM ====================
sampleData = {
    packageTitle: "Dehradun Adventure Trip",
    startDate: "2026-04-10",
    packageImages: [
        {
            url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
            fileName: "dehradun_view.jpg",
            title: "Dehradun Scenic View"
        },
        {
            url: "https://images.unsplash.com/photo-1595526118235-9b6e6d144e16",
            fileName: "robber_cave.jpg",
            title: "Robber's Cave"
        }
    ],
    days: [
        {
            dayTitle: "Day 1: Arrival & City Exploration",
            date: "2026-04-10",
            travels: [
                {
                    from: "Delhi",
                    to: "Dehradun",
                    mode: "Bus",
                    time: "07:00"
                }
            ],
            hotels: [
                {
                    hotelName: "Hotel Pacific Dehradun",
                    city: "Dehradun",
                    checkIn: "2026-04-10",
                    checkOut: "2026-04-12"
                }
            ],
            sightseeing: [
                {
                    placeName: "Robber's Cave",
                    description: "A natural cave formation with a river running inside.",
                    time: "11:00"
                },
                {
                    placeName: "Forest Research Institute",
                    description: "Historic institute with beautiful colonial architecture and museums.",
                    time: "15:00"
                }
            ],
            activities: [
                {
                    activityName: "Local Market Walk",
                    duration: "2 hours",
                    vendor: "City Tour Guide"
                }
            ],
            meals: [
                {
                    mealType: "Breakfast",
                    menu: "Paratha, Tea, Fruit",
                    time: "07:30"
                },
                {
                    mealType: "Lunch",
                    menu: "Dal Makhani, Rice, Salad",
                    time: "13:00"
                },
                {
                    mealType: "Dinner",
                    menu: "Paneer Butter Masala, Roti, Dessert",
                    time: "20:00"
                }
            ]
        },
        {
            dayTitle: "Day 2: Adventure & Nature",
            date: "2026-04-11",
            travels: [
                {
                    from: "Dehradun",
                    to: "Malsi Deer Park",
                    mode: "Car",
                    time: "09:00"
                }
            ],
            hotels: [
                {
                    hotelName: "Hotel Pacific Dehradun",
                    city: "Dehradun",
                    checkIn: "2026-04-10",
                    checkOut: "2026-04-12"
                }
            ],
            sightseeing: [
                {
                    placeName: "Mindrolling Monastery",
                    description: "One of the largest Buddhist centers in India.",
                    time: "11:00"
                },
                {
                    placeName: "Tapkeshwar Temple",
                    description: "Ancient cave temple dedicated to Lord Shiva.",
                    time: "15:00"
                }
            ],
            activities: [
                {
                    activityName: "River Rafting in Song River",
                    duration: "2 hours",
                    vendor: "Adventure Club Dehradun"
                },
                {
                    activityName: "Hiking to Sahastradhara",
                    duration: "3 hours",
                    vendor: "Local Trekking Guide"
                }
            ],
            meals: [
                {
                    mealType: "Breakfast",
                    menu: "Omelette, Toast, Coffee",
                    time: "07:30"
                },
                {
                    mealType: "Lunch",
                    menu: "Rajma, Rice, Salad",
                    time: "13:00"
                },
                {
                    mealType: "Dinner",
                    menu: "Mixed Veg Curry, Roti, Dessert",
                    time: "20:00"
                }
            ]
        }
    ]
}




  loadDataFromBackend(backendData: any) {
    const formData = this.transformBackendToFormData(backendData);
    this.patchForm(formData);
  }

  patchForm(data: any) {
    this.packageForm.patchValue({
      packageTitle: data.packageTitle,
      startDate: data.startDate,
      packageImages: data.packageImages || [],
    });

    this.days.clear();

    data.days.forEach((day: any) => {
      const dayGroup = this.createDay();
      this.days.push(dayGroup);
      dayGroup.patchValue({ dayTitle: day.dayTitle, date: day.date });

      const itemsArray = dayGroup.get('items') as FormArray;
      day.items.forEach((item: any) => {
        const itemGroup = this.createItem(item.type);
        itemGroup.patchValue(item);
        itemsArray.push(itemGroup);
      });
    });

    this.selectedDayIndex = 0;
  }

  transformBackendToFormData(data: any) {
    const transformed = { ...data };
    transformed.days = transformed.days.map((day: any) => {
      const items: any[] = [];
      if (day.travels) day.travels.forEach((t: any) => items.push({ ...t, type: 'TRAVEL' }));
      if (day.hotels) day.hotels.forEach((h: any) => items.push({ ...h, type: 'HOTEL' }));
      if (day.sightseeing) day.sightseeing.forEach((s: any) => items.push({ ...s, type: 'SIGHTSEEING' }));
      if (day.activities) day.activities.forEach((a: any) => items.push({ ...a, type: 'ACTIVITY' }));
      if (day.meals) day.meals.forEach((m: any) => items.push({ ...m, type: 'MEAL' }));
      return { ...day, items };
    });
    return transformed;
  }


  
}
