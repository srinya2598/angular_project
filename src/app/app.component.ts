import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ AuthRoutingModule} from './auth/auth-routing.module';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private router: Router) {

  }

  NgOnInit() {

  }

}
