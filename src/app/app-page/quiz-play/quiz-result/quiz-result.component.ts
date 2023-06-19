import { Component, Input } from '@angular/core';
import { QuestionsWithAnswers } from 'src/classes/QuestionsWithAnswers';
import { RandomAnswer } from 'src/classes/RandomAnswer';

@Component({
  selector: 'quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {
  @Input() questions: QuestionsWithAnswers;
  details = false;
  score: number

  constructor(){
    this.questions = new QuestionsWithAnswers();
    this.score = 0;
  }

  ngOnInit(): void{
    this.computeScore();
  }

  displayDetails(): void{
    this.details = !this.details
  }

  getClassForAnswer(answer: RandomAnswer): string{
    if(answer.correct){
      return 'correct';
    } else if(answer.selected && !answer.correct) {
      return 'wrong-answer';
    } else {
      return '';
    }
  }

  private computeScore(): void{
    let rightAnswers = this.questions.countRightAnswers();
    let score = (rightAnswers / this.questions.count())*100;
    this.score = Math.round(score);
  }
}
