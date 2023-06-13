import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Brain Tease';

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private quizzesService: QuizzesService){ 
  }

  signInClicked(): void{
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOutClicked(): void{
    this.auth.signOut();
    location.reload();
  }

  createClicked(): void{
    this.quizzesService.createQuiz('testttttt', 'desc', '1').subscribe(() => {
      this.router.navigateByUrl('/my-quizzes');
    })
  }

  test(){
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          console.log(user.uid);
          console.log(user);   
        })
      })
  }


}
