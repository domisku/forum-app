import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedTagsComponent } from './most-used-tags.component';

describe('MostUsedTagsComponent', () => {
  let component: MostUsedTagsComponent;
  let fixture: ComponentFixture<MostUsedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostUsedTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostUsedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
