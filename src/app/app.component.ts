import { Component, OnInit } from '@angular/core';

import { StoreService } from './core/recources/services/store.service';
import { ScrollService } from './core/recources/services/scroll.service';
import { Store } from '@ngrx/store';
import Db from './core/recources/models/db.model';
import {
  getAllQuestions,
  getHotQuestions,
  getQuestions,
  getQuestionsWithAuthors,
  getUsers,
} from './store/db/db.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    public scrollService: ScrollService,
    private store: Store<{ db: Db }>
  ) {}

  ngOnInit() {
    this.store.dispatch(getQuestions());
    this.store.dispatch(getUsers());
    this.store.dispatch(getAllQuestions());
    this.store.dispatch(getQuestionsWithAuthors());
    this.store.dispatch(getHotQuestions());
  }

  onRouteActivate() {
    this.scrollService.scrollToPageTop();
  }
}
