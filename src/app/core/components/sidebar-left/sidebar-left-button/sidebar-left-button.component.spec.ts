import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftButtonComponent } from './sidebar-left-button.component';

describe('SidebarLeftButtonComponent', () => {
  let component: SidebarLeftButtonComponent;
  let fixture: ComponentFixture<SidebarLeftButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarLeftButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
