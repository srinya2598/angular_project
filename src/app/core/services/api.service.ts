import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private angularFireAuth: AngularFireAuth) {

  }

  signup(email: string, password: string) {
    if (!email || !password) {
      return;
    }
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));

  }

  login(userData: { email: string, password: string }) {
    if (!userData.email || !userData.password) {
      return;
    }
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(userData.email, userData.password));
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

}
