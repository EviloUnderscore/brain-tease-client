import { Component, OnInit } from '@angular/core';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { Quizzes } from 'src/classes/Quizzes';
import { QuestionsService } from 'src/services/questions.service';
import { QuizzesService } from 'src/services/quizzes.service';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  quizzes: Quizzes;
  filterdQuizzes: Quizzes;
  questionsCount: QuestionsCount;
  userSearch = '';
  titleSearch = '';

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService)
  {
    this.quizzes = new Quizzes();
    this.filterdQuizzes = new Quizzes();
    this.questionsCount = new QuestionsCount();
  }

  ngOnInit(): void{
    this.getAll().then(() => {
      this.getQuestionsCount();
    });
  }

  private async getAll(): Promise<void>{
    this.quizzesService.getAll().subscribe(quizzes => {
      this.quizzes.addAll(quizzes);
      this.filterdQuizzes.addAll(quizzes);
      this.filterdQuizzes.sortByDate();
    });
  }

  private async getQuestionsCount(): Promise<void>{
    this.questionsService.getAll().subscribe(questions => {
      this.questionsCount.addAll(questions);
    })
  }

  public updateSearch(): void{
    const filteredQuizzes = this.quizzes.quizzes.filter((quiz) => {
      const containsAuthorName = quiz.authorName.toLowerCase().includes(this.userSearch.toLowerCase());
      const containsQuizName = quiz.name.toLowerCase().includes(this.titleSearch.toLowerCase());
      return containsAuthorName && containsQuizName;
    });

    this.filterdQuizzes.quizzes = filteredQuizzes;
  }
}
