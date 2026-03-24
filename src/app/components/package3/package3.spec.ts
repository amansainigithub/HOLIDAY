import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package3 } from './package3';

describe('Package3', () => {
  let component: Package3;
  let fixture: ComponentFixture<Package3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Package3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Package3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
