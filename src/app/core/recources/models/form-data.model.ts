export default interface FormData {
  category: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  description: string;
  name: string;
  tags: string;
  title: string;
}
