import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaListaCompartilhadaComponent } from './tabela-lista-compartilhada.component';

describe('ListaCompartilhadaComponent', () => {
  let component: TabelaListaCompartilhadaComponent;
  let fixture: ComponentFixture<TabelaListaCompartilhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaListaCompartilhadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaListaCompartilhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
