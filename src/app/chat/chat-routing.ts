import { Routes } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

export const chatRoutes: Routes = [
  {
    path: '',
    component: ChatContainerComponent
  },
  {
    path: 'conversations',
    component: ChatscreenComponent,
  },
  {
    path: ':id',
    component: ChatWindowComponent,
  }
];
