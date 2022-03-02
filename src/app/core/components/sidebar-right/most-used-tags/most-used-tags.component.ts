import { Component, OnInit } from '@angular/core';
import Db from 'src/app/core/recources/models/db.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import Question from 'src/app/core/recources/models/question.model';

@Component({
  selector: 'app-most-used-tags',
  templateUrl: './most-used-tags.component.html',
  styleUrls: ['./most-used-tags.component.scss'],
})
export class MostUsedTagsComponent implements OnInit {
  showMoreTags = false;
  sortedTags?: Observable<[string, number][] | null>;
  buttonText = 'See more tags';

  constructor(private store: Store<{ db: Db }>) {}

  ngOnInit(): void {
    this.sortedTags = this.store.select((store) => {
      return this.countTags(store.db.allQuestions);
    });
  }

  onButtonClick() {
    this.showMoreTags = !this.showMoreTags;
    if (this.showMoreTags) {
      this.buttonText = 'See less tags';
    } else {
      this.buttonText = 'See more tags';
    }
  }

  private countTags(questions: Question[] | null) {
    if (!questions) {
      return null;
    }

    const tagMap: { [key: string]: number } = {};

    for (let question of questions) {
      if (!question.tags[0]) continue;

      question.tags.forEach((tag) => {
        tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
      });
    }

    const sortedTags = Object.entries(tagMap).sort(
      (cur, next) => next[1] - cur[1]
    );

    return sortedTags;
  }
}
