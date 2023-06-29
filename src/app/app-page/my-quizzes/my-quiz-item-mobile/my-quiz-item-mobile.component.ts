import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';

@Component({
  selector: 'my-quiz-item-mobile',
  templateUrl: './my-quiz-item-mobile.component.html',
  styleUrls: ['./my-quiz-item-mobile.component.css']
})
export class MyQuizItemMobileComponent {
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
