import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/classes/Categories';
import { Quiz } from 'src/classes/Quiz';
import { CategoriesService } from 'src/services/category.service';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'quiz-update',
  templateUrl: './quiz-update.component.html',
  styleUrls: ['./quiz-update.component.css']
})
export class QuizUpdateComponent {
  quiz: Quiz;
  categories: Categories;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private quizzesService: QuizzesService){
    this.quiz = new Quiz();
    this.categories = new Categories();
  }

  ngOnInit(): void{
    this.categoriesService.getAll().subscribe(categories => this.categories.addAll(categories));
  }

  isCreation(): boolean{
    const currentUrl = this.router.url;
    return currentUrl.includes('create');
  }

  submitForm(): void{
    if(this.isFormValid()){
      this.quizzesService.createQuiz(this.quiz.name, this.quiz.description, this.quiz.category_id).subscribe(() => {
        this.router.navigate(['/my-quizzes']);
      })
    }
  }

  isFormValid(): boolean {
    if (!this.quiz.name || !this.quiz.description || !this.quiz.category_id) {
      return false;
    }
    return true;
  }
}
