import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { AuthController } from '../../../core/controllers/auth-controller';
import { IUser } from '../../../shared/models/users';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-container',
  template: ``,
})
export class ProfileContainerComponent {


  constructor(private dialog: MatDialog, private authController: AuthController, private router: Router) {
    let dialogRef;
    this.authController.getUser().pipe(take(1)).subscribe((user: IUser) => {
      dialogRef = this.dialog.open(ProfileComponent, {
        width: '55%',
        data: {
          user: user
        }
      });
    });
    dialogRef.afterClosed().subscribe(() => this.router.navigate(['dashboard']));
  }

}
