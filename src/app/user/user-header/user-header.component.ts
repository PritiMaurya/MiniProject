import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from 'ng2-bootstrap-modal';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {UserRegistrationComponent} from '../../modals/user-registration/user-registration.component';
import jwt = require('angular2-jwt-simple');
import {environment} from '../../config/environment';
import {ApiService} from '../../services/api.service';
import {MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnDestroy, OnInit {
  token; role;
  isLogoutDisplay = false;
  private subscription: Subscription;

  constructor(private dialogService: DialogService,
              private service: ApiService,
              private messageService: MessageService,
              private router: Router) {
    this.token = localStorage.getItem('token');
    const r = localStorage.getItem('role');
    if (r) {
      this.role = jwt.decode(r, environment.secret);
      console.log(this.role);
    }
     this.subscribe();
  }

  subscribe() {
    console.log('subscribe');
    this.subscription = this.messageService.subscribe('receiver', () => {
      this.isLogoutDisplay = true;
    });
  }
  ngOnInit() {
    if (this.token != null && this.role === 'user') {
        this.isLogoutDisplay = true;
    }
  }

  addSignIn() {
    this.service.blur = true;
    this.dialogService.addDialog(LoginModalComponent);
  }

  addSignUp() {
    this.dialogService.addDialog(UserRegistrationComponent);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token = null;
    this.role = null;
    this.isLogoutDisplay = false;
    this.router.navigate(['/home']);
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
}
