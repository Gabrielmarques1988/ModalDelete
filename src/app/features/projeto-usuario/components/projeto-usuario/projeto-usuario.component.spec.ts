import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoUsuarioComponent } from './projeto-usuario.component';

describe('ProjetoUsuarioComponent', () => {
  let component: ProjetoUsuarioComponent;
  let fixture: ComponentFixture<ProjetoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
