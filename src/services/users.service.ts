import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('/api/users')
  }

  getById(id: string):  Observable<User>{
    return this.http.get<User>(`/api/users/${id}`)
  }
}
