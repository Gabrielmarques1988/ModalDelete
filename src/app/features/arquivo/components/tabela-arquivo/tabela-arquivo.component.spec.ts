import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaArquivoComponent } from './tabela-arquivo.component';

describe('TabelaArquivoComponent', () => {
  let component: TabelaArquivoComponent;
  let fixture: ComponentFixture<TabelaArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
