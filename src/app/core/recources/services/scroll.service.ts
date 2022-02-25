import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}

  scrollTo(topCoordinate: number) {
    window.scroll({
      left: 0,
      top: topCoordinate,
      behavior: 'smooth',
    });
  }

  scrollToPageTop() {
    this.scrollTo(0);
  }

  scrollToPageBottom() {
    this.scrollTo(document.body.scrollHeight);
  }
}
