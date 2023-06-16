import { Component, Input } from '@angular/core';
import { Category } from 'src/classes/Category';
import { Quiz } from 'src/classes/Quiz';
import { User } from 'src/classes/User';
import { CategoriesService } from 'src/services/category.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input() quiz: Quiz;
  user: User;
  category: Category;

  constructor(
    private userService: UsersService,
    private categoryService: CategoriesService)
  {
    this.quiz = new Quiz();
    this.user = new User();
    this.category = new Category();
  }

  ngOnInit():void{
    this.getUser();
    this.getCategory();    
  }

  private getUser(): void{
    this.userService.getById(this.quiz.user_id).subscribe(user => this.user.serialize(user));
  }

  private getCategory(): void{
    this.categoryService.getById(this.quiz.category_id).subscribe(category => this.category = category);
  }
}
