import { Component, Input } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input() quiz: Quiz;

  constructor(){
    this.quiz = new Quiz();
  }

}
