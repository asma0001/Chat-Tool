import { Component } from '@angular/core';
import { MyGlobalService } from './cosmo-chat/service/my-global-service.service';
import { ChatServiceService } from './cosmo-chat/service/chat-service.service';
import { Subscription } from 'rxjs'; //Edit

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showChatPanelComponent: boolean = false;
  isDarkMode = false;
  isSidebarHidden: boolean = true;
  isLogedIn: boolean = localStorage.getItem("token") ? true : false

  constructor(public themeService: MyGlobalService, private chatService: ChatServiceService) {
    this.chatService.getChatState().subscribe(data => {
      this.showChatPanelComponent = data.show;
    });
  }

  showChatPanel() {
    this.showChatPanelComponent = true;
  }
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
