import { Component, OnInit } from '@angular/core';

import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faSearch = faSearch;

  constructor() {}

  ngOnInit(): void {}
}
