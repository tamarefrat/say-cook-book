import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase1 from 'firebase';
@Injectable()
export class AuthServiceService {

  private _user;
  db: AngularFireDatabase;

  constructor(  db: AngularFireDatabase, public af: AngularFireAuth) {
    this.db = db;
    this.addNewGoogleUser('abdf');
    console.log('added');
  }


  loginWithGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( user => {
        console.log(user);
        this._user = user;
      });
  }
/*
  public loginWithEmail( email: string, password: string){
      this.af.auth.signInWithEmailAndPassword(email, password)
      .then(user => {

      });
  }*/
/*
  public signupWithEmail( email: string, password: string){
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);

    });
  }
  */
  public isLogin() {
    return !this.af.auth.currentUser;
  }

  addNewGoogleUser(gmail: string) {
const root = firebase1.database().ref();
const newUserKey = root.push({gmail: null}).key;
    const userIref = root.child(newUserKey);
   userIref.set({
      recipes: null,
      categories: null,
      voiceSetting: null,
      sharedRecipes: null
    });
  }
  addNewEmailUser(email: string) {

  }
}
