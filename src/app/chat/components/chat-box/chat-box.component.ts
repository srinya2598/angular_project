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

  @Input () class;

  constructor() { }

  ngOnInit() {
  }
  getChatboxClass() {
    switch (this.class) {
      case 'from-me':
        return 'from-me';
      case 'from-them':
        return 'from-them';
      default:
        return;
    }
  }
}
