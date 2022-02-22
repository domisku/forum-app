import { Component, OnInit } from '@angular/core';

import { GetService } from 'src/app/core/services/get.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  questionsCount: number | null = null;
  usersCount: number | null = null;

  constructor(private getService: GetService) {}

  ngOnInit(): void {
    this.setQuestionsCount();
    this.setUsersCount();
  }

  setQuestionsCount() {
    this.getService
      .getQuestions()
      .subscribe((questions) => (this.questionsCount = questions.length));
  }

  setUsersCount() {
    this.getService
      .getUsers()
      .subscribe((users) => (this.usersCount = users.length));
  }
}
