import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import {HeaderComponent} from '../header/header.component';
import {LeftPanelComponent} from '../left-panel/left-panel.component';
import {DashBodyComponent} from '../dash-body/dash-body.component';
import {AuthService} from "../../services/auth.service";

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let service: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent,
                      HeaderComponent,
                      LeftPanelComponent,
                      DashBodyComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AuthService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    service = null;
  });
  it('can login should be return false when user is not authenticate', () => {
    const spy = spyOn(service, 'isAuthenticate').and.returnValue(false);
    expect(spyOn(component, 'needsLogin')).toBeTruthy();
    expect(service.isAuthenticate()).toHaveBeenCalled();
  });
});
