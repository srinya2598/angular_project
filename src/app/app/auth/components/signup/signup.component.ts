import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fname= new FormControl('', [Validators.required]);
  lname= new FormControl('', [Validators.required]);
  email= new FormControl('', [Validators.required]);
  pwd= new FormControl('', [Validators.required]);
  cpwd= new FormControl('', [Validators.required]);
  phone= new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.fname.hasError('required') ? 'You must enter a value' : '';
    return this.lname.hasError('required') ? 'You must enter a value' : '';
    return this.email.hasError('required') ? 'You must enter a value' : '';
    return this.pwd.hasError('required') ? 'You must enter a value' : '';
    return this.cpwd.hasError('required') ? 'You must enter a value' : '';
    return this.phone.hasError('required') ? 'You must enter a value' : '';

  }
}
