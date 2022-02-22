import { Component, OnInit } from '@angular/core';
import Question from 'src/app/core/models/question.model';

import { GetService } from 'src/app/core/services/get.service';

@Component({
  selector: 'app-most-used-tags',
  templateUrl: './most-used-tags.component.html',
  styleUrls: ['./most-used-tags.component.scss'],
})
export class MostUsedTagsComponent implements OnInit {
  tagMap: { [key: string]: number } = {};
  sortedTags: [string, number][] | null = null;
  shownTags: [string, number][] | null = null;
  showMoreTags = false;
  buttonText = 'See more tags';

  constructor(private getService: GetService) {}

  ngOnInit(): void {
    this.getService
      .getQuestions()
      .subscribe((questions) => this.countTags(questions));
  }

  countTags(questions: Question[]) {
    for (let question of questions) {
      if (!question.tags[0]) continue;

      question.tags.forEach((tag) => {
        this.tagMap[tag] ? this.tagMap[tag]++ : (this.tagMap[tag] = 1);
      });
    }

    this.sortedTags = Object.entries(this.tagMap).sort(
      (cur, next) => next[1] - cur[1]
    );

    this.shownTags = this.sortedTags.slice(0, 8);
  }

  onButtonClick() {
    this.showMoreTags = !this.showMoreTags;
    if (this.showMoreTags) {
      this.buttonText = 'See less tags';
      this.shownTags = this.sortedTags;
    } else {
      this.buttonText = 'See more tags';
      this.shownTags = this.sortedTags ? this.sortedTags.slice(0, 8) : null;
    }
  }
}
