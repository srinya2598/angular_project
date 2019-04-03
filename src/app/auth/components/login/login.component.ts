import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isLoading = false;

  constructor(private router: Router, private apiService: ApiService) {

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
    this.apiService.login(this.formGroup.value).subscribe(res => {
      this.isLoading = false;
      console.log(res);
      this.router.navigate(['dashboard']);
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
