import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import scrollTo from 'src/app/core/utils/scroll-to';

@Component({
  selector: 'app-scroll-buttons',
  templateUrl: './scroll-buttons.component.html',
  styleUrls: ['./scroll-buttons.component.scss'],
})
export class ScrollButtonsComponent implements OnInit {
  showScrollButtons = false;
  scrollThreshold = 200;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor() {}

  ngOnInit(): void {
    let scrolling = false;

    document.addEventListener('scroll', () => {
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
    });
  }

  scrollToPageTop() {
    scrollTo(0);
  }

  scrollToPageBottom() {
    scrollTo(document.body.scrollHeight);
  }
}
