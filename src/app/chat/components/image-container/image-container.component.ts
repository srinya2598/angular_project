import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
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
  imageSent = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private conversationalController: ConversationalController,
              public dialogRef: MatDialogRef<ImageContainerComponent>,
  ) {
    this.downloadUrl = data.imageUrl;
    this.uploadPercentage = data.uploadPercent;
    this.caption = new FormControl(null);
  }

  ngOnInit() {
  }

  sendFile() {
    this.conversationalController.sendFile(this.downloadUrl, this.caption.value);
    this.imageSent = true;
    this.dialogRef.close(this.imageSent);

  }
  imageNotUploaded() {

    this.dialogRef.close(this.imageSent);
  }
}
