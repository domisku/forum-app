import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionsHeaderComponent } from './all-questions-header.component';

describe('AllQuestionsHeaderComponent', () => {
  let component: AllQuestionsHeaderComponent;
  let fixture: ComponentFixture<AllQuestionsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuestionsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuestionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
