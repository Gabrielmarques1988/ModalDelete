import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersoesArquivoComponent } from './versoes-arquivo.component';

describe('VersoesArquivoComponent', () => {
  let component: VersoesArquivoComponent;
  let fixture: ComponentFixture<VersoesArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersoesArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersoesArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
