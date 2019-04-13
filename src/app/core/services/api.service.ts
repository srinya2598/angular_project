import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { IUser } from '../../shared/models/users';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase';
import {IProduct} from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDb: AngularFireDatabase) {

  }

  signup(email: string, password: string) {
    if (!email || !password) {
      return;
    }
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));

  }

  login(userData: { email: string, password: string }) {
    if (!userData) {
      return;
    }
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(userData.email, userData.password));
  }

  signInWithGoogle() {
    return from(this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  setUserDetails(id: string, user: IUser) {
    if (!id || !user) {
      return;
    }
    return from(this.angularFireDb.database.ref(`user/${id}`).set(user));
  }

  getUserDetails(id: string) {
    return this.angularFireDb.object(`user/${id}`).valueChanges();

  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);

  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  setProductDetails(id: string, product: IProduct) {
    if (!id || !product ) {
      return;
    }
    return from(this.angularFireDb.database.ref(`product/${id}`).set(product));
  }
}

