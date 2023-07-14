import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api-service.service';
import { LoginService } from './login-service.service';


interface ChatObject {
  chatId: number;
  // user: {}
  title: string;
  chat: {
    type: string;
    message: string;
    file?: File;
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class ChatServiceService {
  chatArray: ChatObject[] = [];
  currentChatId: number = 0;
  message: string = '';
  activeChat: any;
  file: File | undefined;
  loading = false;
  isFileSelected = false
  profile: any = {};

  constructor(private apiService: ApiService, private loginService: LoginService) {
    // const profileData =  loginService.getProfileData();
    // console.log(profileData);
    this.getProfileData()
  }

  startChat() {
    console.log(this.getProfileData());

    this.currentChatId = this.generateChatId();
    const chatObject: ChatObject = {
      chatId: this.currentChatId,
      // user: this.getProfileData(),
      title: this.message,
      chat: [
        {
          type: 'user',
          message: this.message,
          file: this.file
        },

      ]
    };
    this.chatArray.push(chatObject);
    this.activeChat = { ...chatObject };
    if (this.isFileSelected) {
      this.uploadFile();
    } else {
      this.responseChat()
    }

    console.log(chatObject, "messages")
  }

  generateChatId(): number {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const chatId = parseInt(`${timestamp}${randomSuffix}`);
    return chatId;
  }

  sendChat(): any {
    this.activeChat.chat.push({
      type: 'user',
      message: this.message,
      file: this.file
    });
    this.message = '';
    if (this.isFileSelected) {
      this.uploadFile();
    } else {
      this.responseChat()
    }

  }

  responseChat(): any {
    const messageToSend = this.activeChat.chat[this.activeChat.chat.length - 1].message;
    const chatId = this.activeChat.chatId;
    console.log(chatId)
    this.apiService.sendMessage(chatId, messageToSend).subscribe(
      (response: any) => {
        this.activeChat.chat.push({
          type: 'cosmo',
          message: response.message
        });
        this.isFileSelected = false
      },
      (error: any) => {
        this.isFileSelected = false
        console.error('API error:', error);
      }
    );
  }

  selectedFile(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
    this.isFileSelected = true;
  }

  uploadFile(): void {
    if (this.file) {
      this.apiService.sendFile(this.file).subscribe(
        (response: any) => {
          this.loading = false;
          this.activeChat.chat.push({
            type: 'cosmo',
            message: response.message
          });
          this.isFileSelected = false
        },
        (error: any) => {
          console.error('API error:', error);
          this.isFileSelected = false
        }
      );
    } else null
  }
  getProfileData(): void {
    this.apiService.getProfile().subscribe(
      (response: any) => {
        this.profile = response
        console.log(response,"Profile Dataata")
      },
      (error: any) => {
        console.error('API error:', error);
      }
    );
  }


  // loadoldChat() {
  //   const currentChat = this.chatArray.find(chat => chat.chatId === this.currentChatId);
  //   this.activeChat ={...currentChat};
  // }
  private subject = new Subject<any>();
  showComponent(value: boolean) {
    this.subject.next({ show: value, activeChat: this.activeChat });
  }
  getChatState(): Observable<any> {
    return this.subject.asObservable();
  }

}
