import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatApiService } from './chat-api-service.service';


interface ChatObject {
  chatId: number;
  title: string;
  chat: {
    type: string;
    message: string;
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
  loading = false;

  constructor(private apiService: ChatApiService) { }

  startChat() {
    this.currentChatId = this.generateChatId();
    const chatObject: ChatObject = {
      chatId: this.currentChatId,
      title: this.message,
      chat: [
        {
          type: 'user',
          message: this.message
        },

      ]
    };
    this.chatArray.push(chatObject);
    this.activeChat = { ...chatObject };
    this.responseChat()
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
      message: this.message
    });
    this.message = '';
    this.responseChat()
  }

  responseChat(): any {
    this.loading = true
    this.activeChat.chat.push({
      type: 'cosmo',
      message: "Hi! I am Cosmo, Your marketing assistant. How can i help you?"
    });
    this.loading = false;
    // this.loading = true;
    // this.apiService.sendMessage(this.activeChat.chat[this.activeChat.chat.length - 1].message).subscribe(
    //   (response: any) => {
    //     this.loading = false;
    //     this.activeChat.chat.push({
    //       type: 'cosmo',
    //       message: response.message
    //     });
    //   },
    //   (error: any) => {
    //     console.error('API error:', error);
    //   }
    // );
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
