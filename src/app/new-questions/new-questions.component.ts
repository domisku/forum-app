import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ScrollService } from '../core/recources/services/scroll.service';
import { QuestionWithAuthor } from '../core/recources/models/question-with-author.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as DbActions from 'src/app/store/db/db.actions';
import * as FiltersActions from 'src/app/store/filters/filters.actions';

@Component({
  selector: 'app-new-questions',
  templateUrl: './new-questions.component.html',
  styleUrls: ['./new-questions.component.scss'],
})
export class NewQuestionsComponent implements OnInit {
  questions?: Observable<QuestionWithAuthor[] | null>;

  constructor(
    private scrollService: ScrollService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FiltersActions.reset());
    this.store.dispatch(FiltersActions.updateLimit({ limit: 2 }));
    this.questions = this.store.select(
      (store) => store.db.questionsWithAuthors
    );
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
  }

  pageChanged() {
    this.scrollService.scrollToPageTop();
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
  }
}
