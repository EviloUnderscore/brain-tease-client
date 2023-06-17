import { Component, OnInit } from '@angular/core';
import { Quizzes } from 'src/classes/Quizzes';
import { QuizzesService } from 'src/services/quizzes.service';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  quizzes: Quizzes;
  filterdQuizzes: Quizzes;
  users: any;
  userSearch = '';
  titleSearch = '';

  constructor(
    private quizzesService: QuizzesService)
  {
    this.quizzes = new Quizzes();
    this.filterdQuizzes = new Quizzes();
  }

  ngOnInit(): void{
    this.getAll();
  }

  private async getAll(): Promise<void>{
    this.quizzesService.getAll().subscribe(quizzes => {
      this.quizzes.addAll(quizzes);
      this.filterdQuizzes.addAll(quizzes);
    });
  }

  public updateSearch(): void{
    const filteredQuizzes = this.quizzes.quizzes.filter((quiz) => {
      const containsAuthorName = quiz.authorName.toLowerCase().includes(this.userSearch.toLowerCase());
      const containsQuizName = quiz.name.toLowerCase().includes(this.titleSearch.toLowerCase());
      return containsAuthorName && containsQuizName;
    });

    this.filterdQuizzes.quizzes = filteredQuizzes;
  }
}
