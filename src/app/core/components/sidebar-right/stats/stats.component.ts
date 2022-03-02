import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import Question from 'src/app/core/recources/models/question.model';
import User from 'src/app/core/recources/models/user.model';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  questions?: Observable<Question[] | null>;
  users?: Observable<User[] | null>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.questions = this.store.select((store) => store.db.allQuestions);
    this.users = this.store.select((store) => store.db.users);
  }
}
