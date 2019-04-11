import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { AuthController } from '../core/controllers/auth-controller';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string;
  show = false;

  constructor(private controller: AuthController, private route: Router) {
    this.controller.getUser().subscribe(res => {
      if (res) {
        this.email = res.email;
      }
    });
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.show = !this.show;
  }

  uploadProduct() {
    this.route.navigate(["dashboard/upload-product"]);
  }

  viewProfile(){
    this.route.navigate(["dashboard/profile"]);
  }
}




