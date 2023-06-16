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
    this.quizzesService.getAll().subscribe(quizzes => this.quizzes.addAll(quizzes));
  }

  public deleteQuiz(quiz: Quiz): void{
    this.quizzesService.deleteById(quiz.id).subscribe(() => {
      this.quizzes.removeQuiz(quiz);
    });;
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('test', 'oui', '1').subscribe(() => {
      this.getAll();
    })
  }
}
