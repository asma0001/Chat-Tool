import { Component, EventEmitter, Output, NgModule, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login-service.service';
import { MyGlobalService } from '../../service/my-global-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isDarkMode: boolean;
  constructor(public themeService: MyGlobalService, private loginService: LoginService) {
    this.isDarkMode = this.themeService.isDarkMode;
  }
  onSubmit() {
    this.loginService.email= this.email;
    this.loginService.password = this.password;
    this.loginService.login();
    this.email= ''
    this.password= ''

  }
}
