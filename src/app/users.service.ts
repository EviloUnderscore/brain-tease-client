import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './types';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  })
}

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {}

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('/api/users')
  }

  deleteById(id: string): Observable<any>{
    return this.http.delete<User>(`/api/users/${id}/delete`);
  }
}
