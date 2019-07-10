import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationComponent } from '@ec-shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  success(message: string, duration = 7000) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message,
        class: 'success'
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  error(message: string, duration = 3000) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message,
        class: 'error'
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
