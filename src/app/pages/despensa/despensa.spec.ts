import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Despensa } from './despensa';

describe('Despensa', () => {
  let component: Despensa;
  let fixture: ComponentFixture<Despensa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Despensa],
    }).compileComponents();

    fixture = TestBed.createComponent(Despensa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
