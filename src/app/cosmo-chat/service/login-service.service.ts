import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
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


  constructor(private apiService: ApiService,private router: Router) {

   }


  login(): any {
    debugger
    const email = this.email;
    const password = this.password;
    this.apiService.login(email, password).subscribe(
      (response: any) => {
        console.log('API response:', response);
        this.success = response.success;
        this.profile = response.profile;
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.redirectToChatComponent();
      },
      (error: any) => {
        console.error('API error:', error);
      }
    );
  }

  // getProfileData(): any {
  //   console.log(this.profile, "Profile")
  //   return this.profile;
  // }


  private redirectToChatComponent(): void {
    debugger
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/chat-dashboard']);
    }
  }

}
