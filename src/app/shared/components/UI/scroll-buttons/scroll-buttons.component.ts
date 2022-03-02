import { Component } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent } from 'rxjs';

import { ScrollService } from 'src/app/core/recources/services/scroll.service';

@Component({
  selector: 'app-scroll-buttons',
  templateUrl: './scroll-buttons.component.html',
  styleUrls: ['./scroll-buttons.component.scss'],
})
export class ScrollButtonsComponent {
  showScrollButtons = false;
  scrollThreshold = 200;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private scrollService: ScrollService) {
    const scrollObservable = fromEvent(window, 'scroll');

    scrollObservable
      .pipe(debounceTime(300))
      .subscribe(this.toggleButtons.bind(this));
  }

  scrollToPageTop() {
    this.scrollService.scrollToPageTop();
  }

  scrollToPageBottom() {
    this.scrollService.scrollToPageBottom();
  }

  private toggleButtons() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > this.scrollThreshold) {
      this.showScrollButtons = true;
    } else if (scrollPosition < this.scrollThreshold) {
      this.showScrollButtons = false;
    }
  }
}
