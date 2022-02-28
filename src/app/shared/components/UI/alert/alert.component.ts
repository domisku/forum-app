import { Component, Input } from '@angular/core';

import { StoreService } from 'src/app/core/recources/services/store.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input('message') message?: string;
  @Input('isError') isError?: boolean;

  constructor(private storeService: StoreService) {}

  onDismiss() {
    this.storeService.alertIsShown = false;
  }
}
