import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {
  }
  isAuthenticate() {
    const token = localStorage.getItem('token');
    return token;
  }
}
