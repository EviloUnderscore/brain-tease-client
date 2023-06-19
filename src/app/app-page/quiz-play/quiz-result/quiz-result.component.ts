import { Component, Input } from '@angular/core';
import { QuestionsWithAnswers } from 'src/classes/QuestionsWithAnswers';

@Component({
  selector: 'quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {
  @Input() questions: QuestionsWithAnswers;
  details = false;

  constructor(){
    this.questions = new QuestionsWithAnswers();
  }

  displayDetails(): void{
    this.details = !this.details
  }
}
