import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarProjetoComponent } from './modal-criar-projeto.component';

describe('ModalCriarProjetoComponent', () => {
  let component: ModalCriarProjetoComponent;
  let fixture: ComponentFixture<ModalCriarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCriarProjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCriarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
