import { Component } from '@angular/core';

import {
  faCertificate,
  faCircleQuestion,
  faTags,
  faTrophy,
  faList,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-left-nav',
  templateUrl: './sidebar-left-nav.component.html',
  styleUrls: ['./sidebar-left-nav.component.scss'],
})
export class SidebarLeftNavComponent {
  faCertificate = faCertificate;
  faCircleQuestion = faCircleQuestion;
  faTags = faTags;
  faTrophy = faTrophy;
  faList = faList;
  faUsers = faUsers;
}
