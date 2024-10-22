import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraPesquisaArquivoComponent } from './barra-pesquisa-arquivo.component';

describe('BarraPesquisaArquivoComponent', () => {
  let component: BarraPesquisaArquivoComponent;
  let fixture: ComponentFixture<BarraPesquisaArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraPesquisaArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraPesquisaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
