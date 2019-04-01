import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from "./app-routing.module";
import { AppComponent } from './app.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { RouterModule } from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
