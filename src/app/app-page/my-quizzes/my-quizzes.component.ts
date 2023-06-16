import { Component } from '@angular/core';
import { QuizzesService } from 'src/services/quizzes.service';
import { Quiz } from 'src/types/quiz';

@Component({
  selector: 'my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent {
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
