import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Auth } from '../../service/auth';
import { Usuario } from '../../service/usuario';

@Component({
  selector: 'app-editor-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editor-perfil.html',
  styleUrl: './editor-perfil.css',
})
export class EditorPerfil implements OnInit {

  form!: FormGroup;
  usuarioActual: any;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private usuario: Usuario,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.usuarioActual = this.auth.obtenerUsuario();

    this.form = this.fb.group({
      nombre: [
        this.usuarioActual?.nombre || '',
        Validators.required
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(4)]
      ]
    });
  }

  actualizarPerfil(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Por favor revisa los campos', 'Formulario inválido');
      return;
    }

    const usuarioActualizado = {
      nombre: this.form.value.nombre,
      correo: this.usuarioActual.correo,
      password: this.form.value.password
    };

    this.usuario.editarUsuario(
      this.usuarioActual.id_usuario,
      usuarioActualizado
    ).subscribe({
      next: (data) => {

        const usuarioGuardado = {
          ...this.usuarioActual,
          nombre: usuarioActualizado.nombre
        };

        localStorage.setItem(
          'usuario',
          JSON.stringify(usuarioGuardado)
        );

        this.toastr.success('Perfil actualizado correctamente', 'Éxito');

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error al actualizar el perfil', 'Error');
      }
    });
  }
  login(): void{
    this.router.navigate(['/dashboard']);
  }

}