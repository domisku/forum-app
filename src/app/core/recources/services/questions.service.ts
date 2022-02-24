import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import Question from '../models/question.model';

interface Params {
  category?: string;
  sorting?: string;
  order?: string;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private baseUrl = 'http://localhost:3000/questions';
  private hotQuestionsUrl =
    'http://localhost:3000/questions?_sort=views&_order=desc&_limit=5';

  constructor(private http: HttpClient) {}

  get(params?: Params): Observable<Question[]> {
    let paramsUrl;
    if (params) {
      paramsUrl = this.constructParamsUrl(params);
    } else {
      paramsUrl = '';
    }

    return this.http.get<Question[]>(`${this.baseUrl}${paramsUrl}`);
  }

  getWithHeaders(params?: Params) {
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

  private constructParamsUrl(params: Params) {
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

  post(question: Question) {
    return this.http.post(this.baseUrl, question);
  }
}
