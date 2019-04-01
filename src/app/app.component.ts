import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  group:FormGroup;
  constructor(){
    this.group = new FormGroup({
      email:new FormControl()
    })
  }
}
