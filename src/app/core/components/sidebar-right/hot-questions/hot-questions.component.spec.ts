import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotQuestionsComponent } from './hot-questions.component';

describe('HotQuestionsComponent', () => {
  let component: HotQuestionsComponent;
  let fixture: ComponentFixture<HotQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
