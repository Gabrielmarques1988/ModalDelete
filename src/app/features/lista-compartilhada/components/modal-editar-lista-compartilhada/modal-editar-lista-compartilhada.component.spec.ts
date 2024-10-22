import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarListaCompartilhadaComponent } from './modal-editar-lista-compartilhada.component';

describe('ModalEditarListaCompartilhadaComponent', () => {
  let component: ModalEditarListaCompartilhadaComponent;
  let fixture: ComponentFixture<ModalEditarListaCompartilhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarListaCompartilhadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarListaCompartilhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
