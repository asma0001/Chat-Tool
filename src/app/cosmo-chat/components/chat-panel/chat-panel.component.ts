import { Component } from '@angular/core';
import { MyGlobalService } from '../../service/my-global-service.service';
import { ChatServiceService } from '../../service/chat-service.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent {
  isDarkMode: boolean;
  userMessage: string = '';
  activeChat: any = this.chatService.activeChat;
  constructor(public themeService: MyGlobalService, public chatService: ChatServiceService) {
    this.isDarkMode = this.themeService.isDarkMode;
    this.chatService.getChatState().subscribe(data => {
      this.activeChat = data.activeChat;
    });
  }
  sendChatInput() {
    this.chatService.message = this.userMessage;
    this.chatService.sendChat();
    this.userMessage = ''
    // this.loading = true
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter')  {
      this.chatService.message = this.userMessage;
      this.chatService.sendChat();
      this.userMessage = ''
      // this.loading = true
    }
  }
}
