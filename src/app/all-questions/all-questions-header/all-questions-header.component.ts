import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import Question from 'src/app/core/recources/models/question.model';
import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import Filters from 'src/app/core/recources/models/filters.model';
import {
  updateCategory,
  updateLimit,
  updateOrderAndSorting,
} from 'src/app/store/filters/filters.actions';

type SortOptions = 'dateCreated' | 'votes' | 'answers';

@UntilDestroy()
@Component({
  selector: 'app-all-questions-header',
  templateUrl: './all-questions-header.component.html',
  styleUrls: ['./all-questions-header.component.scss'],
})
export class AllQuestionsHeaderComponent implements OnInit {
  questionsCategories?: string[];
  activeSort: SortOptions = 'dateCreated';

  @Output() onFilterChange = new EventEmitter();

  constructor(
    private questionsService: QuestionsService,
    private store: Store<{ filters: Filters }>
  ) {}

  ngOnInit(): void {
    this.questionsService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((questions) => {
        this.findAllCategories(questions);
      });
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
      updateOrderAndSorting({ order: newSort, sorting: sortBy })
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

    this.store.dispatch(updateCategory({ category: newCategory }));

    this.onFilterChange.emit();
  }

  onChangeLimit(event: Event) {
    this.store.dispatch(
      updateLimit({ limit: +(event.target as HTMLSelectElement).value })
    );

    this.onFilterChange.emit();
  }

  private findAllCategories(questions: Question[]) {
    const categoryMap: { [key: string]: number } = {};

    questions.forEach((question) => {
      if (!categoryMap[question.category]) categoryMap[question.category] = 1;
    });

    this.questionsCategories = Object.keys(categoryMap);
  }
}
