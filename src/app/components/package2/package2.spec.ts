import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package2 } from './package2';

describe('Package2', () => {
  let component: Package2;
  let fixture: ComponentFixture<Package2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Package2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Package2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
