import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { UsersService } from 'src/app/core/recources/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  questionsCount?: number;
  usersCount?: number;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.setQuestionsCount();
    this.setUsersCount();
  }

  private setQuestionsCount() {
    this.questionsService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((questions) => (this.questionsCount = questions.length));
  }

  private setUsersCount() {
    this.usersService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((users) => (this.usersCount = users.length));
  }
}
