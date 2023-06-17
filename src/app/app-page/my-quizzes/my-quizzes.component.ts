import { Component } from '@angular/core';
import { Quizzes } from 'src/classes/Quizzes';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent {
  quizzes: Quizzes;

  constructor(private quizzesService: QuizzesService){
    this.quizzes = new Quizzes();
  }

  ngOnInit(): void{
    this.getAll()
  }

  private getAll(): void{
    this.quizzesService.getAll().subscribe(quizzes => {
      const newQuizzes = new Quizzes()
      newQuizzes.addAll(quizzes);
      this.quizzes = newQuizzes;
      this.quizzes.sortByDate();
    });
  }

  public deleteQuiz(quiz: Quiz): void{
    this.quizzesService.deleteById(quiz.id).subscribe(() => {
      this.quizzes.removeQuiz(quiz);
    });;
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('Questionnaire sur la nature humaine', 'sdvszvqvqv', '1').subscribe(() => {
      this.getAll();
    })
  }
}
