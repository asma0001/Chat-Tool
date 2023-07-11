import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api-service.service';
import { LoginService } from './login-service.service';


interface ChatObject {
  chatId: number;
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

  constructor(private apiService: ApiService , private loginService:LoginService) {
    console.log(this.loginService.getProfileData(),"profile")
   }

  startChat() {
    this.currentChatId = this.generateChatId();
    const chatObject: ChatObject = {
      chatId: this.currentChatId,
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
    if (!this.file) {
      this.responseChat()
    }
    this.uploadFile();

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
    this.responseChat()
    this.uploadFile()
  }

  responseChat(): any {
    // this.loading = true
    // this.activeChat.chat.push({
    //   type: 'cosmo',
    //   message: "Hi! I am Cosmo, Your marketing assistant. How can i help you?"
    // });
    // this.loading = false;
    const messageToSend = this.activeChat.chat[this.activeChat.chat.length - 1].message;
    const chatId = this.activeChat.chatId;
    console.log(chatId)
    this.apiService.sendMessage(chatId, messageToSend).subscribe(
      (response: any) => {
        this.activeChat.chat.push({
          type: 'cosmo',
          message: response.message
        });
      },
      (error: any) => {
        console.error('API error:', error);
      }
    );
  }
  selectedFile(event: any) {
    const file: File = event.target.files[0];
    this.file = file
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
        },
        (error: any) => {
          console.error('API error:', error);
        }
      );
    }else null
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
