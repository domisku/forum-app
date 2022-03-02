import { createAction, props } from '@ngrx/store';
import { QuestionWithAuthor } from 'src/app/core/recources/models/question-with-author.model';
import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';

export const getQuestions = createAction('[Db] Get questions');

export const getQuestionsComplete = createAction(
  '[Db] Get questions complete',
  props<{ questions: Question[] }>()
);

export const getAllQuestions = createAction('[Db] Get all questions');

export const getAllQuestionsComplete = createAction(
  '[Db] Get all questions complete',
  props<{ questions: Question[] }>()
);

export const getUsers = createAction('[Db] Get users');

export const getUsersComplete = createAction(
  '[Db] Get users complete',
  props<{ users: User[] }>()
);

export const getQuestionsWithAuthors = createAction(
  '[Db] Get questions with authors'
);

export const getQuestionsWithAuthorsComplete = createAction(
  '[Db] Get questions with authors complete',
  props<{ questionsWithAuthors: QuestionWithAuthor[] }>()
);

export const getHotQuestions = createAction('[Db] Get hot questions');

export const getHotQuestionsComplete = createAction(
  '[Db] Get hot questions complete',
  props<{ hotQuestions: QuestionWithAuthor[] }>()
);
