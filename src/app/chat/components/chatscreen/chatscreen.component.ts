import { Component, OnInit } from '@angular/core';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {

  constructor(private conversationalController : ConversationalController) { }

  ngOnInit() {
  }

}
