import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {
  }
  isAuthenticate() {
    console.log('auth calling ', !!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }
}
