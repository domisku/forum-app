import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollButtonsComponent } from './scroll-buttons.component';

describe('ScrollButtonsComponent', () => {
  let component: ScrollButtonsComponent;
  let fixture: ComponentFixture<ScrollButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
