import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionWithAuthor } from 'src/app/core/recources/models/question-with-author.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input('questions') questions?: QuestionWithAuthor[] | null;

  constructor(private route: Router) {}

  goToEditPage(id: number) {
    this.route.navigate(['/edit', id]);
  }
}
