import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarempresaComponent } from './buscarempresa.component';

describe('BuscarempresaComponent', () => {
  let component: BuscarempresaComponent;
  let fixture: ComponentFixture<BuscarempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarempresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
