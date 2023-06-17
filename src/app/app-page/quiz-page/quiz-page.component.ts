import { Component, OnInit } from '@angular/core';
import { Category } from 'src/classes/Category';
import { Quiz } from 'src/classes/Quiz';
import { Quizzes } from 'src/classes/Quizzes';
import { User } from 'src/classes/User';
import { CategoriesService } from 'src/services/category.service';
import { QuizzesService } from 'src/services/quizzes.service';
import { UsersService } from 'src/services/users.service';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  quizzes: Quizzes;
  users: any;
  userSearch = '';
  titleSearch = '';

  constructor(
    private quizzesService: QuizzesService,
    private usersService: UsersService,
    private categoriesService: CategoriesService)
  {
    this.quizzes = new Quizzes();

  }

  ngOnInit(): void{
    this.getAll().then(() => {
      console.log(222);
    });
  }

  private async getAll(): Promise<void>{
    this.quizzesService.getAll().subscribe(quizzes => this.quizzes.addAll(quizzes));
  }

  public updateSearch(): void{
    console.log('coucou');
    
  }
}
