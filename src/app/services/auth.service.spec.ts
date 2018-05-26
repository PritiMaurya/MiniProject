import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    authService = new AuthService();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return false if there is no token', () => {
    expect(authService.isAuthenticate()).toBeFalsy();
  });

  it('should return true if there is token', () => {
    localStorage.setItem('token', '123456');
    expect(authService.isAuthenticate()).toBeTruthy();
  });

  afterEach(() => {
    authService = null;
    localStorage.removeItem('token');
  });
});
