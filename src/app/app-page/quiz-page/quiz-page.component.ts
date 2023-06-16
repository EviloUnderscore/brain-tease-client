import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/services/quizzes.service';
import { Quiz } from 'src/types/quiz';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  quizzes: Quiz[] = [];

  constructor(private quizzesService: QuizzesService){
  }

  ngOnInit(): void{
    this.getAll()
  }

  private getAll(): void{
    this.quizzesService.getAll().subscribe(quizzes => this.quizzes = quizzes);
  }

  public deleteQuiz(id: string): void{
    this.quizzesService.deleteById(id).subscribe(() => {
      this.quizzes = this.quizzes.filter(
        quizzes => quizzes.id !== id
      );
    });;
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('azerty', 'desc', '1').subscribe(() => {
      this.getAll();
    })
  }
}
