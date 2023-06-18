import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/classes/Categories';
import { Questions } from 'src/classes/Questions';
import { Quiz } from 'src/classes/Quiz';
import { CategoriesService } from 'src/services/category.service';
import { QuestionsService } from 'src/services/questions.service';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'quiz-update',
  templateUrl: './quiz-update.component.html',
  styleUrls: ['./quiz-update.component.css']
})
export class QuizUpdateComponent {
  quiz: Quiz;
  categories: Categories;
  questions: Questions;
  hasQuestion: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService){
      this.quiz = new Quiz();
      this.categories = new Categories();
      this.questions = new Questions();
  }

  ngOnInit(): void{
    if(!this.isCreation()){
      const quizId = (this.route.snapshot.paramMap.get('id') as string)
      this.quizzesService.getById(quizId).subscribe(quiz => this.quiz = quiz);
      this.questionsService.getByQuizId(quizId).subscribe(questions => {        
        this.questions.addAll(questions);
        this.hasQuestions();
      })
    }
    this.categoriesService.getAll().subscribe(categories => this.categories.addAll(categories));
  }

  isCreation(): boolean{
    const currentUrl = this.router.url;
    return currentUrl.includes('create');
  }

  submitForm(): void{
    if(this.isFormValid()){
      if(this.isCreation()){
        this.quizzesService.createQuiz(this.quiz.name, this.quiz.description, this.quiz.category_id).subscribe(() => {
          this.router.navigate(['/my-quizzes']);
        })
      } else {
        this.quizzesService.updateQuiz(this.quiz.id, this.quiz.name, this.quiz.description, this.quiz.category_id).subscribe(() => {
          this.router.navigate(['/my-quizzes']);
        })
      }
    }
  }

  isFormValid(): boolean {
    if (!this.quiz.name || !this.quiz.description || !this.quiz.category_id) {
      return false;
    }
    return true;
  }

  hasQuestions(): void{
    if(!this.questions.isEmpty()){
      this.hasQuestion = true;  
    };
  }
}
