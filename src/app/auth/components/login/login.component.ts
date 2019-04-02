import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthRoutingModule} from '../../auth-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
password = new FormControl('', [Validators.required]);
  constructor(private router: Router) { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
getPasswordErrorMessage()
{
  return this.password.hasError('required')? ' you must enter your password':
  '';
}
onSignup(){
    this.router.navigate(['/signup']);
}
}
