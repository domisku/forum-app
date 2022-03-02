import Question from './question.model';
import User from './user.model';
import { QuestionWithAuthor } from './question-with-author.model';

export default interface Db {
  allQuestions: Question[] | null;
  questions: Question[] | null;
  users: User[] | null;
  questionsWithAuthors: QuestionWithAuthor[] | null;
  hotQuestions: QuestionWithAuthor[] | null;
}
