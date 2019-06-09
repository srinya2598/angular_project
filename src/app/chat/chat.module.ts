import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { chatRoutes } from './chat-routing';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';

@NgModule({
  declarations: [
    ChatscreenComponent,
    ChatWindowComponent,
    ChatBubbleComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(chatRoutes)
  ]
})
export class ChatModule {
}
