import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ec-chat-container',
  template: ``
})
export class ChatContainerComponent implements OnInit {
  private userId: string;

  constructor(private conversationController: ConversationalController,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.conversationController.fetchMessages();
    this.conversationController.setUpMessageChannel();
    this.conversationController.getOfflineMessages();
    this.conversationController.getNewRoom();
    this.conversationController.getUnreadCount();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.userId = params['id'];
    });
    if (this.userId) {
      this.conversationController.setSelectedUserId(this.userId);
      let roomId = this.conversationController.isRoomsExisting(this.userId);
      if (roomId) {
        this.conversationController.setSelectedRoomId(<string>roomId);
        this.conversationController.fetchRoomMessages(<string>roomId);
      } else {
        this.conversationController.createRoom().then(createdRoomId => {
          this.conversationController.setSelectedRoomId(createdRoomId);
        });
      }

      this.router.navigate(['dashboard/chat', CommonUtils.getRoutePath(this.userId)]);
    } else {
      this.router.navigate(['dashboard/chat/conversations']);
    }
  }
}
