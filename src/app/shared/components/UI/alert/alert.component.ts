import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { StoreService } from 'src/app/core/recources/services/store.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertState', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(
          '650ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent {
  @Input('message') message?: string;
  @Input('isError') isError?: boolean;

  constructor(private storeService: StoreService) {}

  onDismiss() {
    this.storeService.alertIsShown = false;
  }
}
