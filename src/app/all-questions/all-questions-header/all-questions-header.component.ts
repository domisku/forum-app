import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import Question from 'src/app/core/recources/models/question.model';
import * as FiltersActions from 'src/app/store/filters/filters.actions';
import * as fromApp from 'src/app/store/app.reducer';

type SortOptions = 'dateCreated' | 'votes' | 'answers';

@Component({
  selector: 'app-all-questions-header',
  templateUrl: './all-questions-header.component.html',
  styleUrls: ['./all-questions-header.component.scss'],
})
export class AllQuestionsHeaderComponent implements OnInit {
  questionsCategories: Observable<string[] | null> | null = null;
  activeSort: SortOptions = 'dateCreated';

  @Output() onFilterChange = new EventEmitter();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.questionsCategories = this.store.select((store) =>
      this.findAllCategories(store.db.allQuestions)
    );
  }

  onChangeSort(sortBy: SortOptions) {
    this.activeSort = sortBy;

    let newSort: string;
    if (sortBy === 'answers') {
      newSort = 'asc';
    } else {
      newSort = 'desc';
    }

    this.store.dispatch(
      FiltersActions.updateOrderAndSorting({ order: newSort, sorting: sortBy })
    );

    this.onFilterChange.emit();
  }

  onChangeCategory(event: Event) {
    let selectedCategory = (event.target as HTMLSelectElement).value;

    let newCategory: string;
    if (selectedCategory !== 'all') {
      newCategory = selectedCategory;
    } else {
      newCategory = '';
    }

    this.store.dispatch(
      FiltersActions.updateCategory({ category: newCategory })
    );

    this.onFilterChange.emit();
  }

  onChangeLimit(event: Event) {
    this.store.dispatch(
      FiltersActions.updateLimit({
        limit: +(event.target as HTMLSelectElement).value,
      })
    );

    this.onFilterChange.emit();
  }

  private findAllCategories(questions: Question[] | null) {
    if (!questions) {
      return null;
    }

    const categoryMap: { [key: string]: number } = {};

    questions.forEach((question) => {
      if (!categoryMap[question.category]) categoryMap[question.category] = 1;
    });

    return Object.keys(categoryMap);
  }
}
