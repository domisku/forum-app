import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftNavComponent } from './sidebar-left-nav.component';

describe('SidebarLeftNavComponent', () => {
  let component: SidebarLeftNavComponent;
  let fixture: ComponentFixture<SidebarLeftNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarLeftNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
