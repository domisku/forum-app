import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Question from '../core/recources/models/question.model';
import User from '../core/recources/models/user.model';

import { QuestionsService } from '../core/recources/services/questions.service';
import { UsersService } from '../core/recources/services/users.service';
import FormData from '../core/recources/models/form-data.model';
import convertToYMD from '../core/utils/convert-to-ymd';
import convertToJavascriptTime from '../core/utils/convert-to-javascript-time';
import splitByComma from '../core/utils/split-by-comma';
import { StoreService } from '../core/recources/services/store.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
  private questionId?: number;
  private userId?: number;
  formData?: FormData;
  loading = false;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('Missing id from params!');
    }

    this.questionId = +id;
    this.getQuestionData(+id);
  }

  patchData(formData: FormData) {
    this.loading = true;
    const question = this.transformToQuestionData(formData);
    this.patchQuestion(question);

    const user = { username: formData.name };
    this.patchUser(user);
  }

  deleteQuestion() {
    this.loading = true;
    this.questionsService
      .delete(this.questionId!)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loading = false;
        this.storeService.formActionSubject.next();
        this.router.navigate(['/all']);
        this.storeService.showAlert('Question was successfully deleted');
      });
  }

  private patchQuestion(question: Partial<Question>) {
    this.questionsService
      .patch(question, this.questionId!)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  private patchUser(user: Partial<User>) {
    this.usersService
      .patch(user, this.userId!)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loading = false;
        this.storeService.formActionSubject.next();
        this.router.navigate(['/all']);
        this.storeService.showAlert('Question was successfully updated');
      });
  }

  private getQuestionData(id: number) {
    this.questionsService
      .getById(id)
      .pipe(untilDestroyed(this))
      .subscribe((question) => {
        this.userId = question.userId;
        this.getUserData(question);
      });
  }

  private getUserData(question: Question) {
    this.usersService
      .getById(question.userId)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.transformToFormData(question, user);
        this.loading = false;
      });
  }

  private transformToFormData(question: Question, user: User) {
    const { year, month, day } = convertToYMD(question.dateCreated);

    this.formData = {
      category: question.category,
      date: {
        day,
        month,
        year,
      },
      description: question.description,
      name: user.username,
      tags: question.tags.join(', '),
      title: question.title,
    };
  }

  private transformToQuestionData(formData: FormData) {
    return {
      category: formData.category,
      description: formData.description,
      title: formData.title,
      tags: splitByComma(formData.tags).filter((tag) => tag.trim() !== ''),
      dateCreated: convertToJavascriptTime(
        +formData.date.year,
        +formData.date.month,
        +formData.date.day
      ),
    };
  }
}
