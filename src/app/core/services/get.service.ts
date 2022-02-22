import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Question from '../models/question.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestions(params: string = ''): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.baseUrl}/questions${params && '?' + params}`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
