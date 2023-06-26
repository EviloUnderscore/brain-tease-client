import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'my-quiz-item-mobile',
  templateUrl: './my-quiz-item-mobile.component.html',
  styleUrls: ['./my-quiz-item-mobile.component.css']
})
export class MyQuizItemMobileComponent {
  @Input() quiz: Quiz;
  @Output() deletePressed: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private quizzesService: QuizzesService){
    this.quiz = new Quiz();
  }

  public onDeletePressed(): void{
    this.deletePressed.emit(this.quiz)
  }
}
