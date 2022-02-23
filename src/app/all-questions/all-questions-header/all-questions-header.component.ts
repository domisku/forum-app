import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import Question from 'src/app/core/recources/models/question.model';

import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { StoreService } from 'src/app/core/recources/services/store.service';

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
    private storeService: StoreService
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
    this.storeService.filters.sorting = sortBy;

    if (sortBy === 'answers') {
      this.storeService.filters.order = 'asc';
    } else {
      this.storeService.filters.order = 'desc';
    }

    this.onFilterChange.emit();
  }

  onChangeCategory(event: Event) {
    let selectedCategory = (event.target as HTMLSelectElement).value;

    if (selectedCategory !== 'all') {
      this.storeService.filters.category = selectedCategory;
    } else {
      this.storeService.filters.category = '';
    }

    this.onFilterChange.emit();
  }

  onChangeLimit(event: Event) {
    this.storeService.filters.limit = +(event.target as HTMLSelectElement)
      .value;

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
