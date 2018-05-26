import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";
import jwt = require('angular2-jwt-simple');
import { environment} from "../config/environment";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = localStorage.getItem('role');
    let decodedRole
    if (role !== null) {
       decodedRole = jwt.decode(role, environment.secret);
    }
    if (this.auth.isAuthenticate() && (decodedRole === route.data.expectedRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
