import { createReducer, on } from '@ngrx/store';

import Db from 'src/app/core/recources/models/db.model';
import {
  getQuestions,
  getQuestionsComplete,
  getUsers,
  getUsersComplete,
  getQuestionsWithAuthors,
  getQuestionsWithAuthorsComplete,
  getAllQuestions,
  getAllQuestionsComplete,
  getHotQuestions,
  getHotQuestionsComplete,
} from './db.actions';

export const initialState: Db = {
  allQuestions: null,
  questions: null,
  users: null,
  questionsWithAuthors: null,
  hotQuestions: null,
};

export const dbReducer = createReducer(
  initialState,
  on(getQuestions, (state) => {
    return { ...state };
  }),
  on(getQuestionsComplete, (state, action) => {
    console.log('worked');
    return { ...state, questions: action.questions };
  }),
  on(getAllQuestions, (state) => {
    return { ...state };
  }),
  on(getAllQuestionsComplete, (state, action) => {
    console.log('worked');
    return { ...state, allQuestions: action.questions };
  }),
  on(getUsers, (state) => {
    return { ...state };
  }),
  on(getUsersComplete, (state, action) => {
    return { ...state, users: action.users };
  }),
  on(getQuestionsWithAuthors, (state) => {
    return { ...state };
  }),
  on(getQuestionsWithAuthorsComplete, (state, action) => {
    return { ...state, questionsWithAuthors: action.questionsWithAuthors };
  }),
  on(getHotQuestions, (state) => {
    return { ...state };
  }),
  on(getHotQuestionsComplete, (state, action) => {
    return { ...state, hotQuestions: action.hotQuestions };
  })
);
