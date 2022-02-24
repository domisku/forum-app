import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import Question from 'src/app/core/recources/models/question.model';
import { QuestionsService } from 'src/app/core/recources/services/questions.service';
import { StoreService } from 'src/app/core/recources/services/store.service';

@UntilDestroy()
@Component({
  selector: 'app-most-used-tags',
  templateUrl: './most-used-tags.component.html',
  styleUrls: ['./most-used-tags.component.scss'],
})
export class MostUsedTagsComponent implements OnInit {
  private sortedTags!: [string, number][];
  private showMoreTags = false;

  shownTags?: [string, number][];
  buttonText = 'See more tags';

  constructor(
    private questionsService: QuestionsService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getTags();

    this.storeService.formActionSubject
      .pipe(untilDestroyed(this))
      .subscribe(() => this.getTags());
  }

  onButtonClick() {
    this.showMoreTags = !this.showMoreTags;
    if (this.showMoreTags) {
      this.buttonText = 'See less tags';
      this.shownTags = this.sortedTags;
    } else {
      this.buttonText = 'See more tags';
      this.shownTags = this.sortedTags.slice(0, 8);
    }
  }

  private getTags() {
    this.questionsService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe((questions) => this.countTags(questions));
  }

  private countTags(questions: Question[]) {
    const tagMap: { [key: string]: number } = {};

    for (let question of questions) {
      if (!question.tags[0]) continue;

      question.tags.forEach((tag) => {
        tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
      });
    }

    this.sortedTags = Object.entries(tagMap).sort(
      (cur, next) => next[1] - cur[1]
    );

    this.shownTags = this.sortedTags.slice(0, 8);
  }
}
