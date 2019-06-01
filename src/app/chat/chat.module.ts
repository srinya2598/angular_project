import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { chatRoutes } from './chat-routing';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';

@NgModule({
  declarations: [
    ChatscreenComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(chatRoutes)
  ]
})
export class ChatModule {
}
