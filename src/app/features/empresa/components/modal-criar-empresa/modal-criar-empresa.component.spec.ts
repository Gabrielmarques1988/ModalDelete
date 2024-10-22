import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarEmpresaComponent } from './modal-criar-empresa.component';

describe('ModalCriarEmpresaComponent', () => {
  let component: ModalCriarEmpresaComponent;
  let fixture: ComponentFixture<ModalCriarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCriarEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCriarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
