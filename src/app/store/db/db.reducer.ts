import { createReducer, on } from '@ngrx/store';

import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';
import { QuestionWithAuthor } from 'src/app/core/recources/models/question-with-author.model';
import * as DbActions from './db.actions';

export interface State {
  allQuestions: Question[] | null;
  questions: Question[] | null;
  users: User[] | null;
  questionsWithAuthors: QuestionWithAuthor[] | null;
  hotQuestions: QuestionWithAuthor[] | null;
}

export const initialState: State = {
  allQuestions: null,
  questions: null,
  users: null,
  questionsWithAuthors: null,
  hotQuestions: null,
};

export const dbReducer = createReducer(
  initialState,
  on(DbActions.getQuestions, (state) => {
    return { ...state };
  }),
  on(DbActions.getQuestionsComplete, (state, action) => {
    return { ...state, questions: action.questions };
  }),
  on(DbActions.getAllQuestions, (state) => {
    return { ...state };
  }),
  on(DbActions.getAllQuestionsComplete, (state, action) => {
    return { ...state, allQuestions: action.questions };
  }),
  on(DbActions.getUsers, (state) => {
    return { ...state };
  }),
  on(DbActions.getUsersComplete, (state, action) => {
    return { ...state, users: action.users };
  }),
  on(DbActions.getQuestionsWithAuthors, (state) => {
    return { ...state };
  }),
  on(DbActions.getQuestionsWithAuthorsComplete, (state, action) => {
    return { ...state, questionsWithAuthors: action.questionsWithAuthors };
  }),
  on(DbActions.getHotQuestions, (state) => {
    return { ...state };
  }),
  on(DbActions.getHotQuestionsComplete, (state, action) => {
    return { ...state, hotQuestions: action.hotQuestions };
  })
);
