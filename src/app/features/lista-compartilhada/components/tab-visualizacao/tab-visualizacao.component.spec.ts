import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVisualizacaoComponent } from './tab-visualizacao.component';

describe('TabVisualizacaoComponent', () => {
  let component: TabVisualizacaoComponent;
  let fixture: ComponentFixture<TabVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabVisualizacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
