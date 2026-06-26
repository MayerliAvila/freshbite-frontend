import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../service/usuario';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-usuario',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {

  // Formulario reactivo para el registro de usuarios
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuario: Usuario,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Crea el formulario con sus respectivas validaciones.
   */
  ngOnInit(): void {

    // Inicializa el formulario de registro
    this.form = this.fb.group({

      // Campo para el nombre del usuario
      nombre: [
        '',
        [Validators.required]
      ],

      // Campo para el correo electrónico
      correo: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      // Campo para la contraseña
      password: [
        '',
        Validators.required
      ],

    });

  }

  /**
   * Registra un nuevo usuario en el sistema.
   * Valida el formulario y envía la información al backend.
   */
  crearUsuario(): void {

    // Verifica que el formulario sea válido
    if (this.form.invalid) {

      this.toastr.warning(
        'Completar todos los campos obligatorios',
        'Advertencia'
      );

      return;
    }

    // Construye el objeto que será enviado al backend
    const usuario = {

      nombre: this.form.get('nombre')?.value,

      correo: this.form.get('correo')?.value,

      password: this.form.get('password')?.value

    };

    // Envía la información para registrar el usuario
    this.usuario.crearUsuario(usuario).subscribe({

      next: (data) => {

        console.log(data);

        this.toastr.success(
          'Usuario creado con éxito',
          'Registro completado'
        );

        // Limpia el formulario después del registro
        this.form.reset();

      },

      error: (error) => {

        console.log(usuario);

        this.toastr.error(
          error.error?.detail || 'Ocurrió un error al registrar',
          'Error'
        );

      }

    });

  }

  /**
   * Redirecciona a la pantalla de inicio de sesión.
   */
  inicio(): void {
    this.router.navigate(['/']);
  }

}