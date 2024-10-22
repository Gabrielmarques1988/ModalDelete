import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConvidadosComponent } from './tab-convidados.component';

describe('TabConvidadosComponent', () => {
  let component: TabConvidadosComponent;
  let fixture: ComponentFixture<TabConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabConvidadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
