import { Component, Input } from '@angular/core';
import { Quiz } from 'src/classes/Quiz';
import { User } from 'src/classes/User';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input() quiz: Quiz;
  user: User;

  constructor(
    private userService: UsersService){
    this.quiz = new Quiz();
    this.user = new User();
  }

  ngOnInit():void{
    this.getUser();
  }

  private getUser(): void{
    this.userService.getById(this.quiz.user_id).subscribe(user => this.user = user);
  }
}
