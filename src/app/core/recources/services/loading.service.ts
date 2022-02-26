import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  requestsCount = 0;
  isLoading = new BehaviorSubject<boolean>(false);

  incrementRequestCount() {
    this.requestsCount++;
    this.isLoading.next(this.requestsCount > 0);
  }

  decrementRequestCount() {
    this.requestsCount--;
    this.isLoading.next(this.requestsCount > 0);
  }
}
