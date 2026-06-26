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

  // Formulario reactivo para editar el perfil
  form!: FormGroup;

  // Información del usuario autenticado
  usuarioActual: any;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private usuario: Usuario,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene la información del usuario autenticado
   * e inicializa el formulario con sus datos.
   */
  ngOnInit(): void {

    // Obtiene el usuario almacenado en la sesión
    this.usuarioActual = this.auth.obtenerUsuario();

    // Inicializa el formulario con los datos actuales
    this.form = this.fb.group({

      nombre: [
        this.usuarioActual?.nombre || '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]

    });

  }

  /**
   * Actualiza la información del perfil del usuario.
   * Valida el formulario y envía los datos al backend.
   */
  actualizarPerfil(): void {

    // Verifica que el formulario sea válido
    if (this.form.invalid) {

      // Marca todos los campos para mostrar los errores
      this.form.markAllAsTouched();

      this.toastr.warning(
        'Por favor revisa los campos',
        'Formulario inválido'
      );

      return;
    }

    // Construye el objeto con la información actualizada
    const usuarioActualizado = {

      nombre: this.form.value.nombre,

      // El correo no puede modificarse
      correo: this.usuarioActual.correo,

      password: this.form.value.password

    };

    // Envía la información al backend
    this.usuario.editarUsuario(
      this.usuarioActual.id_usuario,
      usuarioActualizado
    ).subscribe({

      next: (data) => {

        // Actualiza la información almacenada en el navegador
        const usuarioGuardado = {
          ...this.usuarioActual,
          nombre: usuarioActualizado.nombre
        };

        localStorage.setItem(
          'usuario',
          JSON.stringify(usuarioGuardado)
        );

        this.toastr.success(
          'Perfil actualizado correctamente',
          'Éxito'
        );

        // Redirecciona al Dashboard
        this.router.navigate(['/dashboard']);

      },

      error: (error) => {
        console.error(error);
        this.toastr.error(
          'Error al actualizar el perfil',
          'Error'
        );
      }

    });

  }

  /**
   * Regresa a la vista principal del Dashboard.
   */
  login(): void {
    this.router.navigate(['/dashboard']);
  }

}