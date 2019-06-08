import { Routes } from '@angular/router';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';

export const chatRoutes: Routes = [
  {
    path: '',
    component: ChatWindowComponent,
  }
];
