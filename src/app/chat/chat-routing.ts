import { Routes } from '@angular/router';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';
import {ChatBubbleComponent} from './components/chat-bubble/chat-bubble.component';
import {DatabaseResolver} from '@ec-core/resolver/resolver.database';

export const chatRoutes: Routes = [
  {
    path: '',
    component: ChatWindowComponent,
    resolve: { Database : DatabaseResolver }
  }
];
