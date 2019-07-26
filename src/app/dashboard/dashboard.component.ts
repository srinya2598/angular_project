import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthController } from '../core/controllers/auth-controller';
import { IUser } from '../shared/models/users';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDialog, MatSidenav } from '@angular/material';
import { CommonUtils } from '../shared/utils/common.utils';
import { ProductController } from '../core/controllers/product-controller';
import { IProductCategory } from '../shared/models/category';
import { Router } from '@angular/router';
import { BroadcasterService } from '@ec-core/services/broadcaster.service';
import { BroadcasterConstants } from '@ec-shared/utils/constants';
import { NotificationService } from '@ec-core/services/notification.service';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: IUser;
  CommonUtils = CommonUtils;
  readonly networkConnectedMessage = 'You are connected to the network!';
  readonly networkDisconnectedMessage = 'You are disconnected from the network!';

  @ViewChild('snav') snav: MatSidenav;

  constructor(private controller: AuthController,
              private dialog: MatDialog,
              private productController: ProductController,
              private router: Router,
              private broadcasterService: BroadcasterService,
              private notificationService: NotificationService,
              private convController: ConversationalController, ) {
    this.controller.getUser().subscribe((res: IUser) => {
      if (res) {
        this.user = res;
      }
    });
  }

  ngOnInit(): void {
    this.convController.setUserStatusOnline();
    window.onunload = (event) => {
      this.convController.setUserStatusOffline().subscribe();
    };

    this.broadcasterService.listen(BroadcasterConstants.NETWORK_CONNECTED).subscribe(_ => {
      this.notificationService.success(this.networkConnectedMessage, 2000);
    });
    this.broadcasterService.listen(BroadcasterConstants.NETWORK_DISCONNECTED).subscribe(_ => {
      this.notificationService.error(this.networkDisconnectedMessage, 2000);
    });
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
    this.closeDrawer();
    this.productController.setSelectedCategory(category);
    this.router.navigate(['dashboard/category', CommonUtils.getRoutePath(category)]);
  }

  navigateToDashboard() {
    this.closeDrawer();
    this.router.navigate(['dashboard']);
  }

  logout() {
    this.closeDrawer();
    this.controller.logout();
  }

  getCategories(): string[] {
    return CommonUtils.getEnumKeys<IProductCategory>(IProductCategory);
  }

  uploadProducts() {
    this.closeDrawer();
    this.router.navigate(['dashboard/upload-product']);
  }

  loadUserProduct() {
    this.closeDrawer();
    this.router.navigate(['dashboard/products']);
  }

  loadCartProducts() {
    this.closeDrawer();
    this.router.navigate(['dashboard/cart']);
  }

  openChatScreen() {
    this.closeDrawer();
    this.router.navigate(['dashboard/chat/conversations']);
  }

  closeDrawer() {
    if (this.snav.opened && CommonUtils.isOnMobile()) {
      this.snav.close();
    }
  }
}




