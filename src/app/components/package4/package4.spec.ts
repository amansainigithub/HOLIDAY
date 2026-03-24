import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package4 } from './package4';

describe('Package4', () => {
  let component: Package4;
  let fixture: ComponentFixture<Package4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Package4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Package4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
