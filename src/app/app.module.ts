import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { rootRoutes } from './app-routing';
import { AppComponent } from './app.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AuthActions} from './auth/actions/auth';
import { rootReducer } from '@ec-core/reducers';
import { CoreModule } from '@ec-core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,

  ],
  imports: [
    RouterModule.forRoot(rootRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer, { metaReducers: [reset] }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule,
    CoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}


export function reset(reducer) {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
