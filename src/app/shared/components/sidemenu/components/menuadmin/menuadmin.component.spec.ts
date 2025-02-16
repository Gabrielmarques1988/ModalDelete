import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuadminComponent } from './menuadmin.component';

describe('MenuadminComponent', () => {
  let component: MenuadminComponent;
  let fixture: ComponentFixture<MenuadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
