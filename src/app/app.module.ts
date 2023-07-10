import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './cosmo-chat/components/sidebar/sidebar.component';
import { ChatComponent } from './cosmo-chat/components/chat/chat.component';
import { ChatPanelComponent } from './cosmo-chat/components/chat-panel/chat-panel.component';
import { MyGlobalService } from './cosmo-chat/service/my-global-service.service';
import { ChatServiceService } from './cosmo-chat/service/chat-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './cosmo-chat/components/login/login.component';
import { LoginService } from './cosmo-chat/service/login-service.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    ChatPanelComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [MyGlobalService,ChatServiceService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
