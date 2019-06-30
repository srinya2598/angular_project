import {Routes} from '@angular/router';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';
import {ChatscreenComponent} from './components/chatscreen/chatscreen.component';

export const chatRoutes: Routes = [
  {
    path: ':id',
    component: ChatWindowComponent,
  },
  {
    path: '',
    component: ChatscreenComponent,
  }
];
