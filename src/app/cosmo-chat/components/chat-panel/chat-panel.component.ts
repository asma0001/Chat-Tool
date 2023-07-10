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

  // onKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter')  {
  //     this.chatService.message = this.userMessage;
  //     this.chatService.sendChat();
  //     this.userMessage = ''
  //     // this.loading = true
  //   }
  // }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents the default behavior of the Enter key (form submission)
      this.chatService.message = this.userMessage;
      this.chatService.sendChat();
      this.userMessage = '';
      // this.loading = true
    } else if (event.key === 'Enter' && event.shiftKey) {
      const inputElement = event.target as HTMLInputElement;
      const currentValue = inputElement.value;
      const selectionStart = inputElement.selectionStart ?? 0;
      const selectionEnd = inputElement.selectionEnd ?? 0;
      const newValue = currentValue.substring(0, selectionStart) + '\n' + currentValue.substring(selectionEnd);
      this.userMessage = newValue;
      event.preventDefault(); // Prevents the default behavior of the Enter key (form submission)

      // Set the cursor position after the line break
      setTimeout(() => {
        inputElement.focus();
        const newCursorPosition = selectionStart + 1; // Move cursor one position after the line break
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  }
  onFileSelected(event: any) {
    this.userMessage =event.target.files[0].name;
    this.chatService.selectedFile(event);
    }

}
