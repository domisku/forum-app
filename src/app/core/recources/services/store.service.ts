import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  alertIsShown = false;
  alertMessage = '';
  isError = false;
  timeoutId?: NodeJS.Timeout;

  showAlert(message: string, isError?: boolean) {
    this.handleOldAlert();

    this.alertMessage = message;
    this.alertIsShown = true;

    if (isError) {
      this.isError = true;
    } else {
      this.isError = false;
      this.timeoutId = setTimeout(() => (this.alertIsShown = false), 4000);
    }
  }

  private handleOldAlert() {
    if (this.alertIsShown) {
      this.alertIsShown = false;
      clearTimeout(this.timeoutId!);
    }
  }
}
