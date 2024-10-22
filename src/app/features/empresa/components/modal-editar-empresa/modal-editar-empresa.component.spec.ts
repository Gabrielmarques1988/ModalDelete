import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEmpresaComponent } from './modal-editar-empresa.component';

describe('ModalEditarEmpresaComponent', () => {
  let component: ModalEditarEmpresaComponent;
  let fixture: ComponentFixture<ModalEditarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
