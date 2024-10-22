import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoTagComponent } from './arquivo-tag.component';

describe('ArquivoTagComponent', () => {
  let component: ArquivoTagComponent;
  let fixture: ComponentFixture<ArquivoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArquivoTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArquivoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
