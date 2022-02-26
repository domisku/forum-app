import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/core/recources/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  spinnerIsShown = false;

  @Input('sizing') sizing: string = 'small';

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading.subscribe(
      (state) => (this.spinnerIsShown = state)
    );
  }
}
