import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGeralComponent } from './tab-geral.component';

describe('TabGeralComponent', () => {
  let component: TabGeralComponent;
  let fixture: ComponentFixture<TabGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGeralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
