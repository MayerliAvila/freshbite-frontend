import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { Usuario } from '../../service/usuario';
import { Auth } from '../../service/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio-sesion',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion implements OnInit {

  // Formulario reactivo para el inicio de sesión
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuario: Usuario,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Crea el formulario de inicio de sesión con sus validaciones.
   */
  ngOnInit(): void {

    // Inicializa el formulario
    this.form = this.fb.group({

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
      ]

    });

  }

  /**
   * Valida las credenciales e inicia la sesión del usuario.
   */
  login(): void {

    // Verifica que el formulario sea válido
    if (this.form.invalid) {

      this.toastr.warning(
        'Por favor completa todos los campos correctamente',
        'Advertencia'
      );

      return;
    }

    // Construye el objeto que será enviado al backend
    const usuario = {

      correo: this.form.get('correo')?.value,

      password: this.form.get('password')?.value

    };

    // Envía la solicitud de autenticación
    this.usuario.login(usuario).subscribe({

      next: (data) => {

        // Guarda la información del usuario autenticado
        this.auth.guardarUsuario((data as any).data);

        this.toastr.success(
          'Bienvenido a FreshBite',
          'Inicio de sesión exitoso'
        );

        // Redirecciona al Dashboard
        this.router.navigate(['/dashboard']);

      },

      error: (error) => {
        console.log(error);

        this.toastr.error(
          'Correo o contraseña incorrectos',
          'Error de acceso'
        );
      }

    });

  }

}