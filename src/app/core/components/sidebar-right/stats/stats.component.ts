import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { StoreService } from 'src/app/core/recources/services/store.service';
import { UsersService } from 'src/app/core/recources/services/users.service';
import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';
import Db from 'src/app/core/recources/models/db.model';

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  questions?: Observable<Question[] | null>;
  users?: Observable<User[] | null>;

  constructor(private store: Store<{ db: Db }>) {}

  ngOnInit(): void {
    this.questions = this.store.select((store) => store.db.allQuestions);
    this.users = this.store.select((store) => store.db.users);
  }
}
