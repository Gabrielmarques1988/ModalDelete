import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginemailComponent } from './loginemail.component';

describe('LoginemailComponent', () => {
  let component: LoginemailComponent;
  let fixture: ComponentFixture<LoginemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginemailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
