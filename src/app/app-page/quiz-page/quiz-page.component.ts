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
  userSearch = '';
  titleSearch = '';

  constructor(private quizzesService: QuizzesService){
    this.quizzes = new Quizzes();
  }

  ngOnInit(): void{
    this.getAll();
  }

  private getAll(): void{
    this.quizzesService.getAll().subscribe(quizzes => this.quizzes.addAll(quizzes));    
  }

  public deleteQuiz(id: string): void{
    this.quizzesService.deleteById(id).subscribe(() => {
      
    });;
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('azerty', 'desc', '1').subscribe(() => {
      this.getAll();
    })
  }

  public updateSearch(): void{
    console.log('coucou');
    
  }
}
