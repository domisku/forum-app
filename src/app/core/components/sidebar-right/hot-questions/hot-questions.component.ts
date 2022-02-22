import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';
import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { UsersService } from 'src/app/core/recources/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-hot-questions',
  templateUrl: './hot-questions.component.html',
  styleUrls: ['./hot-questions.component.scss'],
})
export class HotQuestionsComponent implements OnInit {
  hotQuestions?: Question[];
  authors?: User[];

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.setHotQuestions();
  }

  private setHotQuestions() {
    this.questionsService
      .getHotQuestions()
      .pipe(untilDestroyed(this))
      .subscribe((questions) => {
        this.hotQuestions = questions;
        this.setAuthors();
      });
  }

  private setAuthors() {
    this.usersService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.authors = this.hotQuestions!.map((question) => {
          return users.find((user) => user.id === question.userId) as User;
        });
      });
  }
}
