import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { IUser } from '../../shared/models/users';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase';
import { IProduct } from '../../shared/models/product';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { tsStructureIsReused } from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private angularFireAuth: AngularFireAuth,
              private angularFireDb: AngularFireDatabase,
              private storage: AngularFireStorage) {

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
    if (!id || !product) {
      return;
    }
    return from(this.angularFireDb.database.ref(`products/${id}`).set(product));

  }

  uploadImages(fileName: string, file: File, ref:AngularFireStorageReference): AngularFireUploadTask {

    return ref.put(file);
  }

  getProductImageRef(fileName: string): AngularFireStorageReference {
    return this.storage.ref(`product-images/${fileName}`);
  }

  fetchProduct(){
    return this.angularFireDb.object(`product/`).valueChanges();
  }
uploadProfileImage(fileName, file): AngularFireUploadTask{
    return this.getProfileImageRef(fileName).put(file);


}
getProfileImageRef(profileUrl: string): AngularFireStorageReference{
    return this.storage.ref(`user/${profileUrl);}
    }




}

