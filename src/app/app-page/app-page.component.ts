import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent {
  constructor(public auth: AngularFireAuth){ 
  }

  signOutClicked(): void{
    this.auth.signOut();
    location.reload();
  }
}
