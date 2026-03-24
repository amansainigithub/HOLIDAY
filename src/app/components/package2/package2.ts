import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package2',
  standalone: false,
  templateUrl: './package2.html',
  styleUrls: ['./package2.css'],
})
export class Package2 {

  packageForm!: FormGroup;
  formConfig: any[] = [];
  selectedDayIndex = 0; // tab control

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.getEngineX();

    // 🔥 simulate backend data load
    // setTimeout(() => {
    //   this.loadFormData(this.tempData);
    // }, 2000);
  }

  // ---------------- GET CONFIG FROM BACKEND ----------------
  getEngineX() {
    this.http.get<any>('http://localhost:8080/api/packages/getEngineX')
      .subscribe(res => {
        this.formConfig = res.packageDetails;
        this.packageForm = this.buildForm(this.formConfig);
      });
  }

  // ---------------- RECURSIVE FORM BUILDER ----------------
  buildForm(fields: any[]): FormGroup {
    const group: any = {};

    fields.forEach(field => {

      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(+field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(+field.maxLength));

      if (field.type === 'TEXT' || field.type === 'TIME') {
        group[field.identifier] = ['', validators];
      }
      else if (field.type === 'OBJECT') {
        group[field.identifier] = this.buildForm(field.children || []);
      }
      else if (field.type === 'ARRAY') {
        group[field.identifier] = this.fb.array([], Validators.required);
      }

    });

    return this.fb.group(group);
  }

  // ---------------- GETTERS ----------------
  getArray(name: string): FormArray {
    return this.packageForm.get(name) as FormArray;
  }

  getNestedArray(parent: any, name: string): FormArray {
    return parent.get(name) as FormArray;
  }

  // ---------------- ADD ITEMS ----------------
  addItem(arrayName: string, children: any[]) {
    this.getArray(arrayName).push(this.buildForm(children));
    this.selectedDayIndex = this.getArray(arrayName).length - 1;
  }

  addNestedItem(parentArray: FormArray, index: number, arrayName: string, children: any[]) {
    const arr = parentArray.at(index).get(arrayName) as FormArray;
    arr.push(this.buildForm(children));
  }

  // ---------------- REMOVE ITEMS ----------------
  removeItem(arrayName: string, index: number) {
    const arr = this.getArray(arrayName);
    arr.removeAt(index);
    if (this.selectedDayIndex >= arr.length) {
      this.selectedDayIndex = arr.length - 1;
    }
  }

  removeNestedItem(parentArray: FormArray, parentIndex: number, arrayName: string, index: number) {
    const arr = parentArray.at(parentIndex).get(arrayName) as FormArray;
    arr.removeAt(index);
  }


  createEmptySlot(): FormGroup {
    return this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      activity: ['', [Validators.required, Validators.minLength(3)]],
      hotel: this.fb.group({
        hotelName: ['', Validators.required],
        city: ['', Validators.required]
      })
    });
  }


  // ---------------- FORM SUBMIT ----------------
  onSubmit() {
  console.log("🔥 FINAL DATA", this.packageForm.value);
    
    if (this.packageForm.valid) {
      console.log("🔥 FINAL DATA", this.packageForm.value);
    } else {
      this.packageForm.markAllAsTouched();
    }
  }






















    // ---------------- LOAD EXISTING DATA ----------------
  loadFormData(data: any) {
    this.patchForm(data);
  }

  patchForm(data: any) {
    // patch simple fields
    this.packageForm.patchValue({
      packageTitle: data.packageTitle,
      packageDescription: data.packageDescription
    });

    const daysArray = this.getArray('days');
    daysArray.clear();

    data.days.forEach((day: any) => {
      const dayGroup = this.fb.group({
        title: [day.title, Validators.required],
        slots: this.fb.array([], Validators.required)
      });

      const slotsArray = dayGroup.get('slots') as FormArray;

      if (!day.slots || day.slots.length === 0) {
        // Add default empty slot if none exist
        slotsArray.push(this.createEmptySlot());
      } else {
        day.slots.forEach((slot: any) => {
          slotsArray.push(this.fb.group({
            startTime: [slot.startTime || '', Validators.required],
            endTime: [slot.endTime || '', Validators.required],
            activity: [slot.activity || '', [Validators.required, Validators.minLength(3)]],
            hotel: this.fb.group({
              hotelName: [slot.hotel?.hotelName || '', Validators.required],
              city: [slot.hotel?.city || '', Validators.required]
            })
          }));
        });
      }

      daysArray.push(dayGroup);
    });

    this.selectedDayIndex = 0;
  }


  // ---------------- TEMP DATA ----------------
  tempData = {
    packageTitle: "Couples Choice - Andaman",
    packageDescription: "Sample description for testing edit mode",
    days: [
      {
        title: "Dehradun One Day",
        slots: [
          {
            startTime: "12:40",
            endTime: "13:42",
            activity: "Laptop Working",
            hotel: {
              hotelName: "Anadmar NIchobar",
              city: "Dehradun"
            }
          }
        ]
      },
      {
        title: "Mussorie Plan",
        slots: [
          {
            startTime: "17:46",
            endTime: "16:40",
            activity: "Run away from road",
            hotel: {
              hotelName: "Second Home",
              city: "Mussorie"
            }
          },
          {
            startTime: "13:42",
            endTime: "12:12",
            activity: "Snow Fall",
            hotel: {
              hotelName: "Mussorie Stay",
              city: "Mall Road"
            }
          }
        ]
      },
      {
        title: "Day 3 Kalchi Snow",
        slots: [
          {
            startTime: "11:42",
            endTime: "16:41",
            activity: "Bungee Jumping",
            hotel: {
              hotelName: "Pyaara Lal",
              city: "Jumping Point"
            }
          }
        ]
      }
    ]
  };

}