/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GraficodashComponent } from './graficodash.component';

describe('GraficodashComponent', () => {
  let component: GraficodashComponent;
  let fixture: ComponentFixture<GraficodashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficodashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficodashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
