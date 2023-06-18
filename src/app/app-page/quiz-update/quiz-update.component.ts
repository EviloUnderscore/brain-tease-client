import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/classes/Categories';
import { Quiz } from 'src/classes/Quiz';

@Component({
  selector: 'quiz-update',
  templateUrl: './quiz-update.component.html',
  styleUrls: ['./quiz-update.component.css']
})
export class QuizUpdateComponent {
  quiz: Quiz;
  categories: Categories;

  constructor(private router: Router){
    this.quiz = new Quiz();
    this.categories = new Categories();
  }

  isCreation(): boolean{
    const currentUrl = this.router.url;
    return currentUrl.includes('create');
  }

  submitForm(): void{
    console.log(this.quiz);
    
  }
}
