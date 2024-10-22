import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioSuperadminComponent } from './relatorio-superadmin.component';

describe('RelatorioSuperadminComponent', () => {
  let component: RelatorioSuperadminComponent;
  let fixture: ComponentFixture<RelatorioSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioSuperadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
