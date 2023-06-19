import { Component, Input } from '@angular/core';
import { QuestionsWithAnswers } from 'src/classes/QuestionsWithAnswers';
import { RandomAnswer } from 'src/classes/RandomAnswer';
import { HistoriesService } from 'src/services/histories.service';

@Component({
  selector: 'quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {
  @Input() questions: QuestionsWithAnswers;
  @Input() quiz_id: string;
  details = false;
  score: number;

  constructor(private historiesService: HistoriesService){
    this.questions = new QuestionsWithAnswers();
    this.score = 0;
    this.quiz_id = '';
  }

  ngOnInit(): void{
    this.computeScore();
    this.addHistory();
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

  private addHistory(): void{
    this.historiesService.createHistory(this.quiz_id, this.score).subscribe();
  }

  private computeScore(): void{
    let rightAnswers = this.questions.countRightAnswers();
    let score = (rightAnswers / this.questions.count())*100;
    this.score = parseFloat(score.toFixed(2));
  }
}
