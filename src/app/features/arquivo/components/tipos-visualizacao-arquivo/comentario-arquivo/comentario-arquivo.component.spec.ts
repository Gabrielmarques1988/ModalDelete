import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioArquivoComponent } from './comentario-arquivo.component';

describe('ComentarioArquivoComponent', () => {
  let component: ComentarioArquivoComponent;
  let fixture: ComponentFixture<ComentarioArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
