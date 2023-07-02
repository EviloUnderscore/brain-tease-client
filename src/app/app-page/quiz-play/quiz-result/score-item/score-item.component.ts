import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizHistory } from 'src/classes/QuizHistory';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'score-item',
  templateUrl: './score-item.component.html',
  styleUrls: ['./score-item.component.css']
})
export class ScoreItemComponent {
  @Input() score: QuizHistory;
  @Input() isLargeScreen$: Observable<boolean>;
  @Input() index: number;
  userName: string;

  constructor(private userService: UsersService){
    this.score = new QuizHistory();
    this.isLargeScreen$ =  new Observable<boolean>();
    this.index = 0;
    this.userName = '';
  }

  ngOnInit(): void{
    this.userService.getById(this.score.user_id).subscribe(user => {
      this.userName = user.displayName
    });
    
  }
}
