import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreService } from './core/recources/services/store.service';
import { ScrollService } from './core/recources/services/scroll.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as DbActions from 'src/app/store/db/db.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    public scrollService: ScrollService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(DbActions.getQuestions());
    this.store.dispatch(DbActions.getUsers());
    this.store.dispatch(DbActions.getAllQuestions());
    this.store.dispatch(DbActions.getQuestionsWithAuthors());
    this.store.dispatch(DbActions.getHotQuestions());
  }

  onRouteActivate() {
    this.scrollService.scrollToPageTop();
  }
}
