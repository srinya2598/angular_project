import { Component, OnInit } from '@angular/core';
import { AuthController } from '../core/controllers/auth-controller';
import { IUser } from '../shared/models/users';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDialog } from '@angular/material';
import { CommonUtils } from '../shared/utils/common.utils';
import { ProductController } from '../core/controllers/product-controller';
import { IProductCategory } from '../shared/models/category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: IUser;

  constructor(private controller: AuthController,
              private dialog: MatDialog,
              private productController: ProductController,
              private router: Router) {
    this.controller.getUser().subscribe((res: IUser) => {
      if (res) {
        this.user = res;
      }
    });
  }

  ngOnInit(): void {
  }

  openProfile() {
    this.dialog.open(ProfileComponent, {
      width: '65%',
      data: {
        user: this.user
      }
    });
  }

  selectCategory(category: IProductCategory) {
    this.productController.setSelectedCategory(category);
    this.router.navigate(['dashboard/category', CommonUtils.getRoutePath(category)]);
  }

  getCategories(): string[] {
    return CommonUtils.getCategories();
  }

}




