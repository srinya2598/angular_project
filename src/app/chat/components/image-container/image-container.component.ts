import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  file: File;
  imageUrl: string;
  caption: FormControl;
  send = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<ImageContainerComponent>
  ) {
    this.caption = new FormControl(null);
    this.file = data.file;
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.imageUrl = event.target.result;
    };
  }

  ngOnInit() {
  }

  sendFile() {
    this.send = true;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close({ send: this.send, caption: this.caption.value });
  }
}
