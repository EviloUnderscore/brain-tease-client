import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'my-quiz-item',
  templateUrl: './my-quiz-item.component.html',
  styleUrls: ['./my-quiz-item.component.css']
})
export class MyQuizItemComponent {
  @Input() quiz: Quiz;
  @Output() deletePressed: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private quizzesService: QuizzesService){
    this.quiz = new Quiz();
  }

  public onDeletePressed(): void{
    this.deletePressed.emit(this.quiz)
  }
}
