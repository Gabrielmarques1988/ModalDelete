import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriacaodeempresaComponent } from './modal-criacaodeempresa.component';

describe('ModalCriacaodeempresaComponent', () => {
  let component: ModalCriacaodeempresaComponent;
  let fixture: ComponentFixture<ModalCriacaodeempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCriacaodeempresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCriacaodeempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
