import { Component, HostListener } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

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

  @HostListener('window:scroll') onScrollEvent() {
    let scrolling = false;

    //scroll throttling
    if (!scrolling) {
      setTimeout(() => {
        scrolling = false;
        let scrollPosition = window.scrollY;
        if (scrollPosition > this.scrollThreshold) {
          this.showScrollButtons = true;
        } else if (scrollPosition < this.scrollThreshold) {
          this.showScrollButtons = false;
        }
      }, 300);

      scrolling = true;
    }
  }

  constructor(private scrollService: ScrollService) {}

  scrollToPageTop() {
    this.scrollService.scrollToPageTop();
  }

  scrollToPageBottom() {
    this.scrollService.scrollToPageBottom();
  }
}
