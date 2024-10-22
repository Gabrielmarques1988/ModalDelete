import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoUsuarioModalComponent } from './criacao-usuario-modal.component';

describe('CriacaoUsuarioModalComponent', () => {
  let component: CriacaoUsuarioModalComponent;
  let fixture: ComponentFixture<CriacaoUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriacaoUsuarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriacaoUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
