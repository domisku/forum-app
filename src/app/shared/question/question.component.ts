import { Component, Input, OnInit } from '@angular/core';
import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input('questions') questions?: Question[];
  @Input('authors') authors!: User[];

  constructor() {}

  ngOnInit(): void {}
}
