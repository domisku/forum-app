import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import Question from '../models/question.model';
import Filters from '../models/filters.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private baseUrl = 'http://localhost:3000/questions';
  private hotQuestionsUrl =
    'http://localhost:3000/questions?_sort=views&_order=desc&_limit=5';

  constructor(private http: HttpClient) {}

  get(params?: Partial<Filters>): Observable<Question[]> {
    let paramsUrl;
    if (params) {
      paramsUrl = this.constructParamsUrl(params);
    } else {
      paramsUrl = '';
    }

    return this.http.get<Question[]>(`${this.baseUrl}${paramsUrl}`);
  }

  getById(id: number) {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  getWithHeaders(params?: Partial<Filters>) {
    let paramsUrl;
    if (params) {
      paramsUrl = this.constructParamsUrl(params);
    } else {
      paramsUrl = '';
    }

    return this.http.get<Question[]>(`${this.baseUrl}${paramsUrl}`, {
      observe: 'response',
    });
  }

  getHotQuestions() {
    return this.http.get<Question[]>(this.hotQuestionsUrl);
  }

  post(question: Question) {
    return this.http.post(this.baseUrl, question);
  }

  patch(question: Partial<Question>, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, question);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private constructParamsUrl(params: Partial<Filters>) {
    const { category, sorting, order, page, limit } = params;
    let paramsUrlArr: string[] = [];
    let prefix = '?_';

    if (category) {
      paramsUrlArr.push('category=' + category);
      prefix = '?';
    }

    if (sorting) {
      paramsUrlArr.push('sort=' + sorting);
    }

    if (order) {
      paramsUrlArr.push('order=' + order);
    }

    if (page) {
      paramsUrlArr.push('page=' + page);
    }

    if (limit) {
      paramsUrlArr.push('limit=' + limit);
    }

    const paramsUrl = prefix + paramsUrlArr.join('&_');

    return paramsUrl;
  }
}
