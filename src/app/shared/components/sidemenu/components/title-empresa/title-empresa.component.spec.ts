import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleEmpresaComponent } from './title-empresa.component';

describe('TitleEmpresaComponent', () => {
  let component: TitleEmpresaComponent;
  let fixture: ComponentFixture<TitleEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
