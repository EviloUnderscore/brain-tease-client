import { Component, Input } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';
import { CategoriesService } from 'src/services/category.service';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input() quiz: Quiz;

  constructor(
    private categoryService: CategoriesService)
  {
    this.quiz = new Quiz();
  }

  ngOnInit():void{
    this.getCategory();    
  }

  private getCategory(): void{
    this.categoryService.getById(this.quiz.category_id).subscribe(category => this.quiz.category.serialize(category));
  }
}
