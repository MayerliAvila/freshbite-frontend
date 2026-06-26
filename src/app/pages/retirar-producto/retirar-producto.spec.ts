import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarProducto } from './retirar-producto';

describe('RetirarProducto', () => {
  let component: RetirarProducto;
  let fixture: ComponentFixture<RetirarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirarProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(RetirarProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
