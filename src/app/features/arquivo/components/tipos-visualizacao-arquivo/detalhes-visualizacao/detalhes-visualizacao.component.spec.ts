import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesVisualizacaoComponent } from './detalhes-visualizacao.component';

describe('DetalhesVisualizacaoComponent', () => {
  let component: DetalhesVisualizacaoComponent;
  let fixture: ComponentFixture<DetalhesVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesVisualizacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
