import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayImagesComponent } from './diplay-images.component';

describe('DiplayImagesComponent', () => {
  let component: DiplayImagesComponent;
  let fixture: ComponentFixture<DiplayImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplayImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplayImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
