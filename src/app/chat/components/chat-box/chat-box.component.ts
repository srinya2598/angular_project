import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ec-chatbox',
  styleUrls: ['./chat-box.component.scss'],
  template: `
    <div [class]="getChatboxClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class ChatBoxComponent implements OnInit {

  @Input () userType;

  constructor() { }

  ngOnInit() {
  }
  getChatboxClass() {
    switch (this.userType) {
      case 'from-me':
        return 'from-me';
      case 'from-them':
        return 'from-them';
      default:
        return;
    }
  }
}
