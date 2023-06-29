import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { Quiz } from 'src/classes/Quiz';
import { QuizHistories } from 'src/classes/QuizHistories';
import { CategoriesService } from 'src/services/category.service';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent{
  @Input() quiz: Quiz;
  @Input() questionsCount: QuestionsCount;
  @Input() histories: QuizHistories;
  @Output() onAuthorName: EventEmitter<string> = new EventEmitter<string>();
  nbOfQuestions: number | null;
  isLoading = true;

  constructor(
    private categoryService: CategoriesService)
  {
    this.quiz = new Quiz();
    this.questionsCount = new QuestionsCount();
    this.histories = new QuizHistories();
    this.nbOfQuestions = null;
  }

  ngOnInit():void{
    this.getCategory();
    setTimeout(() => {
      this.computeNumberOfQuestions();
      this.isLoading = false;
    }, 100)
  }

  authorClicked(): void{    
    this.onAuthorName.emit(this.quiz.authorName);
  }

  computeNumberOfQuestions(): void{
    let nbOfQuestions = 0;

    for (let quest of this.questionsCount){
      if (quest.id == this.quiz.id){
        nbOfQuestions = quest.question_count;
        break;
      }
    }
    this.nbOfQuestions= nbOfQuestions;
  }

  displayScore(): string{
    const quizHistories = this.histories.getHistoriesByQuizId(this.quiz.id);
    if(!quizHistories.isEmpty()){
      const higherScore = this.getHigherScore(quizHistories);
      return higherScore + "%"
    } else {
      return "Aucun score répertorié"
    }
  }

  private getHigherScore(quizHistories: QuizHistories): number{
    let highestScore = 0;

    for (const history of quizHistories) {
        if (history.score > highestScore) {
            highestScore = history.score;
        }
    }

    return highestScore;
  }

  private getCategory(): void{
    this.categoryService.getById(this.quiz.category_id).subscribe(category => this.quiz.category.serialize(category));
  }
}
