import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelImgComponent } from './add-hotel-img.component';

describe('AddHotelImgComponent', () => {
  let component: AddHotelImgComponent;
  let fixture: ComponentFixture<AddHotelImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHotelImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
