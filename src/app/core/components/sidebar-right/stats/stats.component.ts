import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';

import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { StoreService } from 'src/app/core/recources/services/store.service';
import { UsersService } from 'src/app/core/recources/services/users.service';
import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  questions?: Observable<Question[]>;
  users?: Observable<User[]>;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.setQuestionsCount();
    this.setUsersCount();

    this.storeService.formActionSubject
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.setQuestionsCount();
        this.setUsersCount();
      });
  }

  private setQuestionsCount() {
    this.questions = this.questionsService.get();
  }

  private setUsersCount() {
    this.users = this.usersService.get();
  }
}
