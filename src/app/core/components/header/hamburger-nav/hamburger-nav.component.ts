import { Component, OnInit } from '@angular/core';

import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hamburger-nav',
  templateUrl: './hamburger-nav.component.html',
  styleUrls: ['./hamburger-nav.component.scss'],
})
export class HamburgerNavComponent implements OnInit {
  faBars = faBars;
  faCaretDown = faCaretDown;

  constructor() {}

  ngOnInit(): void {}
}
