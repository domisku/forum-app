export default interface Question {
  id: number;
  userId: number;
  category: string;
  title: string;
  description: string;
  tags: string[];
  views: number;
  answers: number;
  votes: number;
  dateCreated: number;
}
