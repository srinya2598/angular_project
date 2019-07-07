import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { chatRoutes } from './chat-routing';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { ChatLayoutComponent } from './components/chat-layout/chat-layout.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

@NgModule({
  declarations: [
    ChatscreenComponent,
    ChatWindowComponent,
    ChatBubbleComponent,
    ChatLayoutComponent,
    ChatContainerComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(chatRoutes)
  ]
})
export class ChatModule {
}
