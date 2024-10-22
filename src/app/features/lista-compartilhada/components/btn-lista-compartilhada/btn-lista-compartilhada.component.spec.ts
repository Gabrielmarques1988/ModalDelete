import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnListaCompartilhadaComponent } from './btn-lista-compartilhada.component';

describe('BtnListaCompartilhadaComponent', () => {
  let component: BtnListaCompartilhadaComponent;
  let fixture: ComponentFixture<BtnListaCompartilhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnListaCompartilhadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnListaCompartilhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
