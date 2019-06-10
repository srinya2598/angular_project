import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  message: FormControl;
  myGroup: FormGroup;
  showSave = false;

  constructor() {
    this.myGroup = new FormGroup({
       message: new FormControl(null)
    });
  }

  ngOnInit() {
    this.myGroup.valueChanges.subscribe((value) => {
      if (value.length != 0) {
        (this.showSave = true)
      }
    });
  }
}

