import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';

@Injectable()
export class AuthServiceService { 

  private _user;

  constructor( public af: AngularFireAuth) { }

  loginWithGoogle()
  {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( user => {
        console.log(user);
        this._user = user;        
      });
  }

  public loginWithEmail( email: string, password: string){
      this.af.auth.signInWithEmailAndPassword(email, password)
      .then(user => {

      });
  }

  public signupWithEmail( email: string, password: string){
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);

    })
  }
  public isLogin() {
    return !this.af.auth.currentUser;
  }
}
