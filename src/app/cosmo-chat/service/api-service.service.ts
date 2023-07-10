import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private chatApiUrl = 'http://127.0.0.1:3000/message';
  private loginApiUrl = 'http://localhost:5500/api/v1/auth/login';

  constructor(private http: HttpClient) { }

  sendMessage(chatId: number,message: string): Observable<any> {
    const requestBody = {
      chatId,
      prompt:message
    };
    return this.http.post(this.chatApiUrl, requestBody);
  }
  login(email: string,password: string): Observable<any> {
    const requestBody = {
      Email:email,
      Password:password,
      path:'/login'
    };
    return this.http.post(this.loginApiUrl, requestBody);
  }

}
