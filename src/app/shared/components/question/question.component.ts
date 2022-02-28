import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input('questions') questions?: Question[];
  @Input('authors') authors!: User[];

  constructor(private route: Router) {}

  goToEditPage(id: number) {
    this.route.navigate(['/edit', id]);
  }
}
