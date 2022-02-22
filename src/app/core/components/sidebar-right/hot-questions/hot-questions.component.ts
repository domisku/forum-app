import { Component, OnInit } from '@angular/core';
import Question from 'src/app/core/models/question.model';
import User from 'src/app/core/models/user.model';

import { GetService } from 'src/app/core/services/get.service';

@Component({
  selector: 'app-hot-questions',
  templateUrl: './hot-questions.component.html',
  styleUrls: ['./hot-questions.component.scss'],
})
export class HotQuestionsComponent implements OnInit {
  hotQuestions: Question[] | null = null;
  authors: User[] | null = null;

  constructor(private getService: GetService) {}

  ngOnInit(): void {
    this.setHotQuestions();
  }

  setHotQuestions() {
    this.getService
      .getQuestions('_sort=views&_order=desc&_limit=5')
      .subscribe((questions) => {
        this.hotQuestions = questions;
        this.setAuthors();
      });
  }

  setAuthors() {
    this.getService.getUsers().subscribe((users) => {
      this.authors = this.hotQuestions!.map((question) => {
        return users.find((user) => user.id === question.userId) as User;
      });
    });
  }
}
