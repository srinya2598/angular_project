import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { AuthController } from '../core/controllers/auth-controller';
import { Router } from '@angular/router';
import {Constants} from '../shared/utils/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string;
  show = false;

  constructor(private controller: AuthController, private route: Router,private apiService: ApiService) {
    this.controller.getUser().subscribe(res => {
      console.log("fired");
      if (res) {
        this.email = res.firstName;
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

  onLogout(){
    this.apiService.removeItem(Constants.USER_UID);
    this.route.navigate(['/login']);
  }
}




