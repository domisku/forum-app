import { Component, OnInit } from '@angular/core';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  faCaretDown = faCaretDown;

  constructor() {}

  ngOnInit(): void {}
}
