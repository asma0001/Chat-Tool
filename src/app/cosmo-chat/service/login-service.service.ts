import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService{
  email: string = '';
  password: string = '';
  token: string = '';
  success: boolean = false;
  profile: any = {};

  constructor(private apiService: ApiService) {

   }


  login(): any {
    const email = this.email;
    const password = this.password;
    this.apiService.login(email, password).subscribe(
      (response: any) => {
        console.log('API response:', response);
        this.success = response.success;
        this.profile = response.profile;
        this.token = response.token;
        localStorage.setItem('token', this.token);
      },
      (error: any) => {
        console.error('API error:', error);
      }
    );
  }


}
