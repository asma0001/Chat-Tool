import { Component, EventEmitter, Output, NgModule, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyGlobalService } from '../../service/my-global-service.service';
import { ChatServiceService } from '../../service/chat-service.service';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isDarkMode: boolean;
  message: string = '';
  constructor(public themeService: MyGlobalService, private chatService: ChatServiceService) {
    this.isDarkMode = this.themeService.isDarkMode;
  }
  startChatInput() {
    this.chatService.message = this.message;
    this.chatService.startChat();
    this.chatService.showComponent(true);
    // this.chatService.sendChat();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter')  {
      this.chatService.message = this.message;
      this.chatService.startChat();
      this.chatService.showComponent(true);
    }
  }
}
