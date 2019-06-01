import { Routes } from '@angular/router';
import { ChatGuard } from '../core/gaurds/chat.guard';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';

export const chatRoutes: Routes = [
  {
    path: 'chatscreen',
    component: ChatscreenComponent,
    canActivate: [ChatGuard]
  }
];
