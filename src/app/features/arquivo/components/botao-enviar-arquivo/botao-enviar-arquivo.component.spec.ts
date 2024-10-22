import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEnviarArquivoComponent } from './botao-enviar-arquivo.component';

describe('BotaoEnviarArquivoComponent', () => {
  let component: BotaoEnviarArquivoComponent;
  let fixture: ComponentFixture<BotaoEnviarArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoEnviarArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoEnviarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
