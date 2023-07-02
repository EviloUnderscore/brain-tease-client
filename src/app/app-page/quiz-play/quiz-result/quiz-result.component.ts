import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsWithAnswers } from 'src/classes/QuestionsWithAnswers';
import { QuizHistories } from 'src/classes/QuizHistories';
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
  @Input() isLargeScreen$: Observable<boolean>;
  histories: QuizHistories;
  scoreboard: QuizHistories;
  details = false;
  score: number;

  constructor(private historiesService: HistoriesService){
    this.questions = new QuestionsWithAnswers();
    this.score = 0;
    this.quiz_id = '';
    this.isLargeScreen$ =  new Observable<boolean>();
    this.histories = new QuizHistories();
    this.scoreboard = new QuizHistories();
  }

  ngOnInit(): void{
    this.computeScore();
    this.addHistory().then(() => {
      setTimeout(() => {
        this.getHistoriesByQuiz();
      }, 100)
    });
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

  private getHistoriesByQuiz(): void{
    this.historiesService.getByQuiz(this.quiz_id).subscribe(histories => {
      this.histories.addAll(histories);
      this.renderScoreboard();
    })
  }

  private renderScoreboard(): void{
    this.scoreboard = this.histories.getTopScores(this.histories);
  }

  private async addHistory(): Promise<void>{
    this.historiesService.createHistory(this.quiz_id, this.score).subscribe();
  }

  private computeScore(): void{
    let rightAnswers = this.questions.countRightAnswers();
    let score = (rightAnswers / this.questions.count())*100;
    this.score = parseFloat(score.toFixed(2));
  }
}
