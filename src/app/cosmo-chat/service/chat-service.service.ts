import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface ChatObject {
  chatId: number;
  title: string;
  chat:  {
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
  constructor() { }

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
    console.log(chatObject, "messages")
  }


  generateChatId(): number {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const chatId = parseInt(`${timestamp}${randomSuffix}`);
    return chatId;
  }

  sendChat(): any {
    if (this.activeChat) {
      this.activeChat.chat.push({
        type: 'user',
        message: this.message
      });
      this.message = '';
      this.activeChat.chat.push({
        type: 'cosmo',
        message: "Hi! I am Cosmo, Your marketing assistant. How can i help you?"
      });
    }
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
