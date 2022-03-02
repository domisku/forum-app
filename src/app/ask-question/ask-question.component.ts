import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

import FormData from '../core/recources/models/form-data.model';
import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';
import { QuestionsService } from '../core/recources/services/questions.service';
import { StoreService } from '../core/recources/services/store.service';
import { UsersService } from '../core/recources/services/users.service';
import convertToJavascriptTime from '../core/utils/convert-to-javascript-time.util';
import splitByComma from '../core/utils/split-by-comma.util';
import { onCanFormDeactivate } from '../shared/guards/can-deactivate.guard';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate.guard';
import { FormComponent } from '../shared/components/form/form.component';
import { Store } from '@ngrx/store';
import Db from '../core/recources/models/db.model';
import {
  getAllQuestions,
  getHotQuestions,
  getUsers,
} from '../store/db/db.actions';

@UntilDestroy()
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements CanComponentDeactivate {
  private changesSaved = false;

  @ViewChild(FormComponent) formComponent?: FormComponent;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private storeService: StoreService,
    private router: Router,
    private store: Store<{ db: Db }>
  ) {}

  resetForm(form: FormGroup) {
    form.reset();
  }

  formSubmitted(data: FormData) {
    this.changesSaved = true;

    const { user, question } = this.transformFormData(data);
    this.postQuestion(question);
    this.postUser(user);
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return onCanFormDeactivate(
      this.formComponent?.form.touched!,
      this.changesSaved
    );
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
        this.store.dispatch(getAllQuestions());
        this.store.dispatch(getHotQuestions());
        this.store.dispatch(getUsers());
        this.router.navigate(['/all']);
        this.storeService.showAlert('Your question was posted successfully');
      });
  }

  private postQuestion(question: Question) {
    this.questionsService.post(question).pipe(untilDestroyed(this)).subscribe();
  }
}
