import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesRapidas } from './acciones-rapidas';

describe('AccionesRapidas', () => {
  let component: AccionesRapidas;
  let fixture: ComponentFixture<AccionesRapidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesRapidas],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesRapidas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
