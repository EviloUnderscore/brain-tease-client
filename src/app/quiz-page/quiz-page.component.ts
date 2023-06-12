import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../types';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  users: User[] = [];

  constructor(private usersService: UsersService){
  }

  ngOnInit(): void{
    this.usersService.getAll().subscribe(users => this.users = users);
  }

  deleteUser(id: string): void{
    this.usersService.deleteById(id).subscribe(() => {
      this.users = this.users.filter(
        user => user.id !== id
      );
    });;
  }
}
