import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isLoading = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  login() {
    console.log(this.formGroup.value);
    this.isLoading = true;
    // Added only for testing purpose...
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
