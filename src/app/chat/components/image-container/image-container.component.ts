import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  downloadUrl: string;
  uploadPercentage = 0;
  message: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private conversationalController: ConversationalController) {
    this.downloadUrl = data.imageUrl;
    this.uploadPercentage = data.uploadPercent;
  }

  ngOnInit() {
  }

  sendFile() {
    this.conversationalController.sendFile(this.downloadUrl, this.message.value);
  }
}
