import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ApiService} from "../services/api.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.apiService.checkToken()) {
      console.log('true');
      return true;
    } else {
      console.log('check token');
      console.log(this.apiService.checkToken());
      console.log('false');
      this.router.navigate(['/notAccess']);
      return false;
    }
  }
}
