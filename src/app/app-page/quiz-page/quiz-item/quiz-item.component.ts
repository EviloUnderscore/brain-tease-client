import { Component, Input } from '@angular/core';
import { Category } from 'src/classes/Category';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { Quiz } from 'src/classes/Quiz';
import { CategoriesService } from 'src/services/category.service';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent{
  @Input() quiz: Quiz;
  @Input() questionsCount: QuestionsCount;
  nbOfQuestions: number | null;
  isLoading = true;

  constructor(
    private categoryService: CategoriesService)
  {
    this.quiz = new Quiz();
    this.questionsCount = new QuestionsCount();
    this.nbOfQuestions = null;
  }

  ngOnInit():void{
    this.getCategory();
    setTimeout(() => {
      this.computeNumberOfQuestions();
      this.isLoading = false;
    }, 100)
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

  private getCategory(): void{
    this.categoryService.getById(this.quiz.category_id).subscribe(category => this.quiz.category.serialize(category));
  }
}
