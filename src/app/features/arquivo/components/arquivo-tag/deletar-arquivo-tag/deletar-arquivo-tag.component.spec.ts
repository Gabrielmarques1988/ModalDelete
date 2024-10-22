import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarArquivoTagComponent } from './deletar-arquivo-tag.component';

describe('DeletarArquivoTagComponent', () => {
  let component: DeletarArquivoTagComponent;
  let fixture: ComponentFixture<DeletarArquivoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarArquivoTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletarArquivoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
