import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MyGlobalService } from '../../service/my-global-service.service';
import { ChatServiceService } from '../../service/chat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toogleMode = new EventEmitter<void>();
  allChatList: any[] = this.chatService.chatArray;
  isDarkMode: boolean;
  isSideBarOpen: boolean = true;

  constructor(public themeService: MyGlobalService, private chatService: ChatServiceService,private router:Router) {
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
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleOpen(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
