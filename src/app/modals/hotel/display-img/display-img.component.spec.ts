import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayImgComponent } from './display-img.component';

describe('DisplayImgComponent', () => {
  let component: DisplayImgComponent;
  let fixture: ComponentFixture<DisplayImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
