import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(public auth: AngularFireAuth){ 
  }

  signInClicked(): void{
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
}
