import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SAMPLE_DATA } from './sampleData';

@Component({
  selector: 'app-package4',
  standalone: false,
  templateUrl: './package4.html',
  styleUrl: './package4.css',
})
export class Package4 {

//  STAY DATA SATRTING 
nightsList = [
  { id: 1, label: '1 Night' },
  { id: 2, label: '2 Nights' },
  { id: 3, label: '3 Nights' },
  { id: 4, label: '4 Nights' },
  { id: 5, label: '5 Nights' },
  { id: 6, label: '6 Nights' },
  { id: 7, label: '7 Nights' },
  { id: 8, label: '8 Nights' },
  { id: 9, label: '9 Nights' },
  { id: 10, label: '10 Nights' }
];

daysList = [
  { id: 1, label: '1 Day' },
  { id: 2, label: '2 Day' },
  { id: 3, label: '3 Day' },
  { id: 4, label: '4 Day' },
  { id: 5, label: '5 Day' },
  { id: 6, label: '6 Day' },
  { id: 7, label: '7 Day' },
  { id: 8, label: '8 Day' },
  { id: 9, label: '9 Day' },
  { id: 10, label: '10 Day' }
];

cities: any[] = [
  { id: 1, name: 'Manali' },
  { id: 2, name: 'Goa' },
  { id: 3, name: 'Jaipur' },
  { id: 4, name: 'Udaipur' },
  { id: 5, name: 'Shimla' },
  { id: 6, name: 'Kashmir' }
];
//  STAY DATA ENDING 

 packageForm!: FormGroup;

  constructor(private fb: FormBuilder , private http:HttpClient) {}

  ngOnInit() {
    this.packageForm = this.fb.group({
      // PACKAGE INFO STARTING
      packageTitle: ['', [
                          Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(100),
                          Validators.pattern(/^[a-zA-Z0-9\s\-&()]+$/) // special chars restrict
                        ]],
                        
      startDate: [''], 
      packageImages: [[]], 
      stayPlan: this.fb.array([]),
      // PACKAGE INFO ENDING

      days: this.fb.array([]),
      
    });

  // PACKAGE INFO  
  this.addStay();// default 1 stay plan

  this.addDay(); // default 1 day
  

  //  👇 API simulate
  setTimeout(() => {
    this.loadDataFromBackend(SAMPLE_DATA);
  }, 2000);
  
  }






//================================================================================================================
//============================================= PACKAGE INFO STARTING =============================================
//ADD STAY PLAN
addStay() {
  this.stayPlan.push(this.createStay());
}

// CREATE STAY PLAN
createStay(): FormGroup {
  return this.fb.group({
    nights: ['', Validators.required],
    days: ['', Validators.required],
    city: ['', Validators.required]
  });
}
//GET STAY PLAN
get stayPlan(): FormArray {
  return this.packageForm.get('stayPlan') as FormArray;
}

//REMOVE STAY PLAN
removeStay(index: number) {
  this.stayPlan.removeAt(index);
}




// IMAGES FOR PACKAGE INFO STARTING
images: any[] = [];

onFileSelect(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.uploadImage(file);
  }
}

saveImages() {
  // 👉 Add into main package form
  this.packageForm.patchValue({
    packageImages: this.images
  });

  console.log("Saved Images", this.images);
}

removeImage(index: number) {
  this.images.splice(index, 1);
}

replaceImage(event: any, index: number) {
  const file = event.target.files[0];
  if (!file) return;

  this.uploadImage(file, index);
}uploadImage(file: File, index?: number) {

  if (this.images.length >= 20 && index === undefined) {
    alert("Max 20 images allowed");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  // Track order: agar naya image hai to use last index + 1 de do
  const sequence = index !== undefined ? index + 1 : this.images.length + 1;
  formData.append('order', sequence.toString()); // backend ke liye

  this.http.post<any>('YOUR_API_URL', formData).subscribe({
    next: (res) => {

      const newImage = {
        url: res.url,
        fileName: res.fileName,
        title: res.title,
        order: sequence // frontend me bhi order track
      };

      // 👉 replace or add
      if (index !== undefined) {
        this.images[index] = newImage;
      } else {
        this.images.push(newImage);
      }
    },

    error: () => {

      const dummy = {
        url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2',
        fileName: file.name,
        title: 'Dummy Image',
        order: sequence
      };

      if (index !== undefined) {
        this.images[index] = dummy;
      } else {
        this.images.push(dummy);
      }
    }
  });
}
// IMAGES FOR PACKAGE INFO ENDING


//==============================================================================================================
//============================================= PACKAGE INFO ENDING =============================================





































// ===============================================================================================================
// ============================================ITINIARY STARTING==================================================

  // ===== DAYS =====

  addDay() {
  const day = this.createDay();
  this.days.push(day);

  // default ek item (slot) open hoga
  this.addItem(this.days.length - 1, 'TRAVEL');
  this.addItem(this.days.length - 1, 'SIGHTSEEING');
}

createDay(): FormGroup {
  return this.fb.group({
    dayTitle: ['', Validators.required],
    date: ['', Validators.required], // 👈 NEW FIELD
    items: this.fb.array([])
  });
}

get days(): FormArray {
    return this.packageForm.get('days') as FormArray;
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
      checkOut: [''],
      images: [[]]
    });
  }

  if (type === 'SIGHTSEEING') {
    return this.fb.group({
      type: [type],
      placeName: ['', Validators.required],
      description: [''],
      time: [''],
      images: [[]]
    });
  }

  if (type === 'ACTIVITY') {
    return this.fb.group({
      type: [type],
      activityName: ['', Validators.required],
      duration: [''],
      vendor: [''],
      images: [[]]
    });
  }

  if (type === 'MEAL') {
  return this.fb.group({
    type: [type],
    mealType: ['', Validators.required],
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
    this.addDay();
  }
}


removeItem(dayIndex: number, itemIndex: number) {
  this.getItems(dayIndex).removeAt(itemIndex);
}

  getDayForm(index: number): FormGroup {
  return this.days.at(index) as FormGroup;
}










//SIGHTSEEING IMAGES STARTING

sightseeingImages: { [key: string]: any[] } = {};
currentKey!: string;
currentSightseeingImages: any[] = [];

openSightseeingModal(dayIndex: number, itemIndex: number) {
  this.currentKey = `${dayIndex}_${itemIndex}`;

  this.currentSightseeingImages =
    this.sightseeingImages[this.currentKey] || [];

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('sightseeingImageModal')
  );
  modal.show();
}

onSightseeingFileSelect(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.uploadSightseeingImage(file);
  }
}

uploadSightseeingImage(file: File, index?: number) {

  if (this.currentSightseeingImages.length >= 10 && index === undefined) {
    alert("Max 10 images allowed");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  // 👇 sequence maintain karna important hai
  const sequence = index !== undefined
    ? index + 1
    : this.currentSightseeingImages.length + 1;

  formData.append('order', sequence.toString());

  this.http.post<any>('YOUR_API_URL', formData).subscribe({

    // ✅ SUCCESS (REAL BACKEND)
    next: (res) => {

      const newImage = {
        url: res.url,
        fileName: res.fileName,
        title: res.title || 'Sightseeing Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentSightseeingImages[index] = newImage;
      } else {
        this.currentSightseeingImages.push(newImage);
      }
    },

    // ❌ ERROR → DUMMY IMAGE
    error: () => {

      const dummy = {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // 👈 nice fallback
        fileName: file.name,
        title: 'Dummy Sightseeing Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentSightseeingImages[index] = dummy;
      } else {
        this.currentSightseeingImages.push(dummy);
      }
    }
  });
}
removeSightseeingImage(index: number) {
  this.currentSightseeingImages.splice(index, 1);
}

replaceSightseeingImage(event: any, index: number) {
  const file = event.target.files[0];
  if (!file) return;

  this.uploadSightseeingImage(file, index);
}

saveSightseeingImages() {

  this.sightseeingImages[this.currentKey] =
    this.currentSightseeingImages;

  // 👇 update form also
  const [dayIndex, itemIndex] = this.currentKey.split('_').map(Number);

  const item = this.getItems(dayIndex).at(itemIndex);

  item.patchValue({
    images: this.currentSightseeingImages
  });

  console.log("Saved SS Images:", this.currentSightseeingImages);
}

//SIGHTSEEING IMAGES ENDING.....












































// HOTEL IMAGES STARTING
hotelImagesMap: { [key: string]: any[] } = {};

currentHotelKey!: string;
currentHotelImages: any[] = [];

openHotelModal(dayIndex: number, itemIndex: number) {
  this.currentHotelKey = `${dayIndex}_${itemIndex}`;

  this.currentHotelImages =
    this.hotelImagesMap[this.currentHotelKey] || [];

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('hotelImageModal')
  );
  modal.show();
}

uploadHotelImage(file: File, index?: number) {

  if (this.currentHotelImages.length >= 10 && index === undefined) {
    alert("Max 10 images allowed");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const sequence = index !== undefined
    ? index + 1
    : this.currentHotelImages.length + 1;

  formData.append('order', sequence.toString());

  this.http.post<any>('YOUR_API_URL', formData).subscribe({

    // ✅ REAL
    next: (res) => {

      const newImage = {
        url: res.url,
        fileName: res.fileName,
        title: res.title || 'Hotel Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentHotelImages[index] = newImage;
      } else {
        this.currentHotelImages.push(newImage);
      }
    },

    // ❌ DUMMY
    error: () => {

      const dummy = {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        fileName: file.name,
        title: 'Dummy Hotel Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentHotelImages[index] = dummy;
      } else {
        this.currentHotelImages.push(dummy);
      }
    }
  });
}



onHotelFileSelect(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.uploadHotelImage(file);
  }
}

removeHotelImage(index: number) {
  this.currentHotelImages.splice(index, 1);
}

replaceHotelImage(event: any, index: number) {
  const file = event.target.files[0];
  if (!file) return;

  this.uploadHotelImage(file, index);
}


saveHotelImages() {

  this.hotelImagesMap[this.currentHotelKey] =
    this.currentHotelImages;

  const [dayIndex, itemIndex] = this.currentHotelKey.split('_').map(Number);

  const item = this.getItems(dayIndex).at(itemIndex);

  item.patchValue({
    images: this.currentHotelImages
  });

  console.log("Saved Hotel Images:", this.currentHotelImages);
}
// HOTEL IMAGES ENDING.....























// ACTIVITY IMAGES STARTING
activityImagesMap: { [key: string]: any[] } = {};

currentActivityKey!: string;
currentActivityImages: any[] = [];


openActivityModal(dayIndex: number, itemIndex: number) {
  this.currentActivityKey = `${dayIndex}_${itemIndex}`;

  this.currentActivityImages =
    this.activityImagesMap[this.currentActivityKey] || [];

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('activityImageModal')
  );
  modal.show();
}

uploadActivityImage(file: File, index?: number) {

  if (this.currentActivityImages.length >= 10 && index === undefined) {
    alert("Max 10 images allowed");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const sequence = index !== undefined
    ? index + 1
    : this.currentActivityImages.length + 1;

  formData.append('order', sequence.toString());

  this.http.post<any>('YOUR_API_URL', formData).subscribe({

    // ✅ REAL
    next: (res) => {

      const newImage = {
        url: res.url,
        fileName: res.fileName,
        title: res.title || 'Activity Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentActivityImages[index] = newImage;
      } else {
        this.currentActivityImages.push(newImage);
      }
    },

    // ❌ DUMMY
    error: () => {

      const dummy = {
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        fileName: file.name,
        title: 'Dummy Activity Image',
        order: sequence
      };

      if (index !== undefined) {
        this.currentActivityImages[index] = dummy;
      } else {
        this.currentActivityImages.push(dummy);
      }
    }
  });
}

onActivityFileSelect(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.uploadActivityImage(file);
  }
}

removeActivityImage(index: number) {
  this.currentActivityImages.splice(index, 1);
}

replaceActivityImage(event: any, index: number) {
  const file = event.target.files[0];
  if (!file) return;

  this.uploadActivityImage(file, index);
}


saveActivityImages() {

  this.activityImagesMap[this.currentActivityKey] =
    this.currentActivityImages;

  const [dayIndex, itemIndex] = this.currentActivityKey.split('_').map(Number);

  const item = this.getItems(dayIndex).at(itemIndex);

  item.patchValue({
    images: this.currentActivityImages
  });

  console.log("Saved Activity Images:", this.currentActivityImages);
}
// ACTIVITY IMAGES ENDING...





// ===============================================================================================================
// ============================================ITINIARY ENDING ==================================================







































































// ===============================================================================================
// ===== ===================================SUBMIT DATA===========================================
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
    days: transformedDays,
    stayPlan: this.transformStayPlan(this.packageForm.value.stayPlan) // 👈 added
  };

  console.log("Backend Payload:", payload);
  // this.http.post('YOUR_API_URL', payload).subscribe(...)
}

// STAY PLAN TRANSFORM START
transformStayPlan(stayPlan: any[]): any[] {
  return stayPlan.map(plan => ({
    nights: plan.nights,
    days: plan.days,
    city: plan.city
  }));
}
// STAY PLAN TRANSFORM END




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
              checkOut: item.checkOut,
              images: item.images ? item.images.map((img: any, index: number) => ({
                url: img.url,
                fileName: img.fileName,
                title: img.title,
                order: img.order ?? index + 1
              })) : []
            });
            break;

          case 'SIGHTSEEING':
            backendDay.sightseeing.push({
              placeName: item.placeName,
              description: item.description,
              time: item.time,
              images: item.images ? item.images.map((img: any, index: number) => ({
                url: img.url,
                fileName: img.fileName,
                title: img.title,
                order: img.order ?? index + 1
              })) : []
            });
            break;  

          case 'ACTIVITY':
            backendDay.activities.push({
              activityName: item.activityName,
              duration: item.duration,
              vendor: item.vendor,
              images: item.images ? item.images.map((img: any, index: number) => ({
                url: img.url,
                fileName: img.fileName,
                title: img.title,
                order: img.order ?? index + 1
              })) : []
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


// CHECK ERROR STARTING
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
// CHECK ERROR ENDING
// ========================================SUBMIT  DATA ENDING=========================================
// ====================================================================================================

































// ==================== SAMPLE DATA ====================


  loadDataFromBackend(backendData: any) {
  const formData = this.transformBackendToFormData(backendData);

  this.packageForm.patchValue({
    packageTitle: formData.packageTitle,
    startDate: formData.startDate,
    packageImages: formData.packageImages || [],
  });

  this.images = formData.packageImages || [];

  // DAYS
  this.days.clear();
  formData.days.forEach((day: any) => {
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

  // ✅ STAY PLAN ADD KARO
  this.stayPlan.clear();
  if (formData.stayPlan) {
    formData.stayPlan.forEach((stay: any) => {
      const stayGroup = this.createStay();
      stayGroup.patchValue(stay);
      this.stayPlan.push(stayGroup);
    });
  }

  this.selectedDayIndex = 0;
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

  // ✅ STAY PLAN
  this.stayPlan.clear();
  if (data.stayPlan) {
    data.stayPlan.forEach((stay: any) => {
      const stayGroup = this.createStay();
      stayGroup.patchValue(stay);
      this.stayPlan.push(stayGroup);
    });
  }
  this.selectedDayIndex = 0;
}

transformBackendToFormData(data: any) {
  const transformed = { ...data };

  transformed.days = transformed.days.map((day: any) => {
    const items: any[] = [];

    if (day.travels) {
      day.travels.forEach((t: any) =>
        items.push({ ...t, type: 'TRAVEL' })
      );
    }

    if (day.hotels) {
      day.hotels.forEach((h: any) =>
        items.push({
          ...h,
          type: 'HOTEL',
          images: h.images || [] // ✅ important
        })
      );
    }

    if (day.sightseeing) {
      day.sightseeing.forEach((s: any) =>
        items.push({
          ...s,
          type: 'SIGHTSEEING',
          images: s.images || []
        })
      );
    }

    if (day.activities) {
      day.activities.forEach((a: any) =>
        items.push({
          ...a,
          type: 'ACTIVITY',
          images: a.images || [] // ✅ important
        })
      );
    }

    if (day.meals) {
      day.meals.forEach((m: any) =>
        items.push({ ...m, type: 'MEAL' })
      );
    }

    return { ...day, items };
  });

  return transformed;
}















  
}
