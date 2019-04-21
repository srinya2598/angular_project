import { Component, OnInit } from '@angular/core';
import { AuthController } from '../core/controllers/auth-controller';
import { IUser } from '../shared/models/users';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: IUser;

  constructor(private controller: AuthController, private dialog: MatDialog) {
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

}




