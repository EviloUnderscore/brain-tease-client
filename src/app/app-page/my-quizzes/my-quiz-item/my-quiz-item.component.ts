import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';

@Component({
  selector: 'my-quiz-item',
  templateUrl: './my-quiz-item.component.html',
  styleUrls: ['./my-quiz-item.component.css']
})
export class MyQuizItemComponent {
  @Input() quiz: Quiz;
  @Output() deletePressed: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  public isLoading = false;

  constructor(){
    this.quiz = new Quiz();
  }

  public onDeletePressed(): void{
    this.isLoading = true;
    this.deletePressed.emit(this.quiz)
  }
}
