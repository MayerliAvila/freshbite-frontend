import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRapido } from './resumen-rapido';

describe('ResumenRapido', () => {
  let component: ResumenRapido;
  let fixture: ComponentFixture<ResumenRapido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenRapido],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenRapido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
