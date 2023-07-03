import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MyGlobalService } from '../../service/my-global-service.service';
import { ChatServiceService } from '../../service/chat-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toogleMode = new EventEmitter<void>();
  allChatList: any[] = this.chatService.chatArray;
  isDarkMode: boolean;

  constructor(public themeService: MyGlobalService, private chatService: ChatServiceService) {
    this.isDarkMode = this.themeService.isDarkMode;
  }
  startChat() {
    this.chatService.showComponent(false);
  }
  loadChat(chat: any) {
    this.chatService.activeChat = chat;
    this.chatService.currentChatId = chat.chatId;
    this.chatService.showComponent(true);
  }
}
