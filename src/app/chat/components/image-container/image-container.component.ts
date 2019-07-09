import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
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
  caption: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private conversationalController: ConversationalController,
              private dialog: MatDialog) {
    this.downloadUrl = data.imageUrl;
    this.uploadPercentage = data.uploadPercent;
    this.caption = new FormControl(null);
  }

  ngOnInit() {
  }

  sendFile() {
    this.conversationalController.sendFile(this.downloadUrl, this.caption.value);
    this.dialog.closeAll();
  }
}
