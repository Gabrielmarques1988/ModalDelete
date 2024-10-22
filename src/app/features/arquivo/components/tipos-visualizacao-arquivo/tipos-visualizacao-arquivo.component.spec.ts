import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposVisualizacaoArquivoComponent } from './tipos-visualizacao-arquivo.component';

describe('TiposVisualizacaoArquivoComponent', () => {
  let component: TiposVisualizacaoArquivoComponent;
  let fixture: ComponentFixture<TiposVisualizacaoArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposVisualizacaoArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposVisualizacaoArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
