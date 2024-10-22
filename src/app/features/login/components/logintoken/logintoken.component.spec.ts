import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintokenComponent } from './logintoken.component';

describe('LogintokenComponent', () => {
  let component: LogintokenComponent;
  let fixture: ComponentFixture<LogintokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogintokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogintokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
