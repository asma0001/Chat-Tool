import { Component, EventEmitter, Output, NgModule, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private loginService: LoginService) {
  }
  onSubmit() {
    this.loginService.email= this.email;
    this.loginService.password = this.password;
    this.loginService.login();
    this.email= ''
    this.password= ''

  }
}
