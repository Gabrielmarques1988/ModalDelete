import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroPesquisaComponent } from './modal-filtro-pesquisa.component';

describe('ModalFiltroPesquisaComponent', () => {
  let component: ModalFiltroPesquisaComponent;
  let fixture: ComponentFixture<ModalFiltroPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltroPesquisaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFiltroPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
