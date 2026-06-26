import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDespensa } from './grafico-despensa';

describe('GraficoDespensa', () => {
  let component: GraficoDespensa;
  let fixture: ComponentFixture<GraficoDespensa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoDespensa],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoDespensa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
