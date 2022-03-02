import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import Filters from 'src/app/core/recources/models/filters.model';
import * as fromActions from './db.actions';
import { UsersService } from 'src/app/core/recources/services/users.service';

@Injectable()
export class DbEffects {
  getAllQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getAllQuestions.type),
      mergeMap(() =>
        this.questionsService.get().pipe(
          map((questions) => {
            return {
              type: fromActions.getAllQuestionsComplete.type,
              questions: questions,
            };
          })
        )
      )
    )
  );

  getQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getQuestions.type),
      withLatestFrom(this.store.select('filters')),
      mergeMap((filters) =>
        this.questionsService.get(filters[1]).pipe(
          map((questions) => {
            return {
              type: fromActions.getQuestionsComplete.type,
              questions: questions,
            };
          })
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getUsers.type),
      mergeMap(() =>
        this.usersService.get().pipe(
          map((users) => {
            return {
              type: fromActions.getUsersComplete.type,
              users: users,
            };
          })
        )
      )
    )
  );

  getQuestionsWithAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getQuestionsWithAuthors.type),
      withLatestFrom(this.store.select('filters')),
      mergeMap((filters) =>
        forkJoin({
          questions: this.questionsService.get(filters[1]),
          users: this.usersService.get(),
        }).pipe(
          map((data) => {
            const authors = data.questions.map((question) => {
              return data.users.find((user) => user.id === question.userId);
            });

            const questionsWithAuthors = data.questions.map(
              (question, index) => {
                return { ...authors[index], ...question };
              }
            );

            return {
              type: fromActions.getQuestionsWithAuthorsComplete.type,
              questionsWithAuthors,
            };
          })
        )
      )
    )
  );

  getHotQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getHotQuestions.type),
      mergeMap(() =>
        forkJoin({
          questions: this.questionsService.getHotQuestions(),
          users: this.usersService.get(),
        }).pipe(
          map((data) => {
            const authors = data.questions.map((question) => {
              return data.users.find((user) => user.id === question.userId);
            });

            const hotQuestions = data.questions.map((question, index) => {
              return { ...authors[index], ...question };
            });

            return {
              type: fromActions.getHotQuestionsComplete.type,
              hotQuestions,
            };
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ filters: Filters }>,
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {}
}
