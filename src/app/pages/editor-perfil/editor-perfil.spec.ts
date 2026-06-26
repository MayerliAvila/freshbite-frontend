import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPerfil } from './editor-perfil';

describe('EditorPerfil', () => {
  let component: EditorPerfil;
  let fixture: ComponentFixture<EditorPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
