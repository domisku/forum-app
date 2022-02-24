import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import FormData from '../core/recources/models/form-data.model';
import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { StoreService } from '../core/recources/services/store.service';
import { UsersService } from '../core/recources/services/users.service';
import convertToJavascriptTime from '../core/utils/convert-to-javascript-time';
import splitByComma from '../core/utils/split-by-comma';

@UntilDestroy()
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  loading = false;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  resetForm(form: FormGroup) {
    form.reset();
  }

  formSubmitted(data: FormData) {
    this.loading = true;
    const { user, question } = this.transformFormData(data);
    this.postQuestion(question);
    this.postUser(user);
  }

  private transformFormData(data: FormData) {
    const userId = Math.random();

    const user: User = {
      id: userId,
      username: data.name,
      status: 'train',
      profileImgUrl: 'https://picsum.photos/200',
    };

    const question: Question = {
      id: Math.random(),
      userId,
      category: data.category,
      title: data.title,
      description: data.description,
      tags: splitByComma(data.tags).filter((tag) => tag.trim() !== ''),
      views: 0,
      answers: 0,
      votes: 0,
      dateCreated: convertToJavascriptTime(
        +data.date.year,
        +data.date.month,
        +data.date.day
      ),
    };

    return { user, question };
  }

  private postUser(user: User) {
    this.usersService
      .post(user)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.storeService.formActionSubject.next();
        this.router.navigate(['/all']);
        this.storeService.showAlert('Your question was posted successfully');
        this.loading = false;
      });
  }

  private postQuestion(question: Question) {
    this.questionsService.post(question).pipe(untilDestroyed(this)).subscribe();
  }
}
