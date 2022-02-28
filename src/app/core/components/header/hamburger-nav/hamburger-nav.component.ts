import { Component } from '@angular/core';

import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hamburger-nav',
  templateUrl: './hamburger-nav.component.html',
  styleUrls: ['./hamburger-nav.component.scss'],
})
export class HamburgerNavComponent {
  menuIsShown = false;
  faBars = faBars;
  faCaretDown = faCaretDown;

  toggleMenu() {
    this.menuIsShown = !this.menuIsShown;
  }
}
