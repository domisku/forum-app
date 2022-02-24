import { Component } from '@angular/core';
import { StoreService } from './core/recources/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public storeService: StoreService) {}
}
