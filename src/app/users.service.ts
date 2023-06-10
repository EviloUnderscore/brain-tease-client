import { Injectable } from '@angular/core';
import { User } from './types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {}

  getAll(): User[]{
    return [{ 
      id: 'string',
      firstname: 'string',
      lastname: 'string',
      mail: 'string',
  }]
  }
}
