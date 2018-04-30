import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModel1Component } from './confirm-model1.component';

describe('ConfirmModel1Component', () => {
  let component: ConfirmModel1Component;
  let fixture: ComponentFixture<ConfirmModel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
