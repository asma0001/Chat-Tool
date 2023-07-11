import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base URL for the API
  private chatApiUrl = 'http://127.0.0.1:3000';
  private loginApiUrl = 'https://my.connektahub.com/api/v1/auth/login';

  constructor(private http: HttpClient) { }

/**
   * Sends a login request with the provided credentials.
   * @param username The username for authentication.
   * @param password The password for authentication.
   * @returns An observable containing the authentication token.
   */
  login(email: string,password: string): Observable<any> {
    const requestBody = {
      Email:email,
      Password:password,
      path:'/login'
    };
    return this.http.post(this.loginApiUrl, requestBody);
  }

  /**
   * Sends a message to the Cosmo bot API.
   * @param message The message to send.
   * @param chatId The chatId to send.
   * @returns An observable containing the response from the bot.
   */
  sendMessage(chatId: number,message: string): Observable<any> {
    const requestBody = {
      chatId,
      prompt:message
    };
    return this.http.post(this.chatApiUrl + '/message', requestBody);
  }

    /**
   * Sends a file to the Cosmo bot API.
   * @param file The file to send.
   * @returns An observable containing the response from the bot.
   */

  sendFile(file:File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('userId', userId);
    return this.http.post(this.chatApiUrl + '/file', formData);
  }

}
