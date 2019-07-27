import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { IUser } from '@ec-shared/models/users';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase';
import { IProduct } from '@ec-shared/models/product';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { IMessage } from '@ec-shared/models/message';
import { IRoom } from '@ec-shared/models/room';

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

  uploadImages(fileName: string, file: File, ref: AngularFireStorageReference): AngularFireUploadTask {

    return ref.put(file);
  }

  getProductImageRef(fileName: string): AngularFireStorageReference {
    return this.storage.ref(`product-images/${fileName}`);
  }

  fetchProduct() {
    return this.angularFireDb.object(`products`).valueChanges();
  }

  uploadProfileImage(fileName: string, file: File, ref: AngularFireStorageReference): AngularFireUploadTask {
    return ref.put(file);

  }

  getProfileImageRef(fileName: string): AngularFireStorageReference {
    return this.storage.ref(`profile-picture/${fileName}`);
  }

  setCartProducts(userId: string, productIds: string[]) {
    return from(this.angularFireDb.database.ref(`user/${userId}/cart`).set(productIds));
  }

  fetchCartProducts(userId: string) {
    return this.angularFireDb.object(`user/${userId}/cart`).valueChanges();
  }

  getMessageStream(userId: string) {
    return this.angularFireDb.object<IMessage>(`chat/${userId}`).valueChanges();
  }

  sendMessage(id: string, message: IMessage) {
    return from(this.angularFireDb.database.ref(`chat/${id}`).set(message));
  }

  fetchUserRooms(userId: string) {
    return this.angularFireDb.object(`user_rooms/${userId}`).valueChanges();
  }

  setUserRooms(ids: string[], userId: string) {
    return from(this.angularFireDb.database.ref(`user_rooms/${userId}`).set(ids));
  }

  fetchRoomDetails(roomId: string) {
    return this.angularFireDb.object(`rooms/${roomId}`).valueChanges();
  }

  setRoomDetails(room: IRoom) {
    return from(this.angularFireDb.database.ref(`rooms/${room.id}`).set(room));
  }

  uploadAttachedFile(fileName: string, file: File, ref: AngularFireStorageReference): AngularFireUploadTask {

    return ref.put(file);
  }

  getAttachedFileRef(roomId: string, fileName: string): AngularFireStorageReference {
    return this.storage.ref(`chat-images/${roomId + fileName}`);
  }

  setUserStatus(userId: string, staus: string) {
    return from(this.angularFireDb.database.ref(`user_status/${userId}`).set(staus));
  }

  getUserStatus(userId: string) {
    return this.angularFireDb.object(`user_status/${userId}`).valueChanges();
  }

  setMessageOffline(userId: string, message: IMessage[]) {
    return from(this.angularFireDb.database.ref(`user_offline_messages/${userId}`).set(message));
  }

  getMessageOffline(userId: string) {
    return this.angularFireDb.object(`user_offline_message/${userId}`).valueChanges();
  }

  deleteMessageOffline(userId: string) {
    return this.angularFireDb.object(`user_offline_message/${userId}`).remove();

  }
}

