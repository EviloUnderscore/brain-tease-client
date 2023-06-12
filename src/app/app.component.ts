import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Brain Tease';

  constructor(public auth: AngularFireAuth){ 
  }

  signInClicked(): void{
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOutClicked(): void{
    this.auth.signOut();
    location.reload();
  }

  test(){
    console.log(this.auth.user);
  }


}
