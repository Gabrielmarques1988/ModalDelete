import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProjetoComponent } from './modal-editar-projeto.component';

describe('ModalEditarProjetoComponent', () => {
  let component: ModalEditarProjetoComponent;
  let fixture: ComponentFixture<ModalEditarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarProjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
