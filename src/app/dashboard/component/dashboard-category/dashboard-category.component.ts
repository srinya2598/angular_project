import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.scss']
})
export class DashboardCategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onMobile(){
    this.router.navigate(['dashboard/category']);
  }
}
