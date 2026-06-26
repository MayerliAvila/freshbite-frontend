import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { Usuario } from '../../service/usuario';
import {Auth} from '../../service/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuario: Usuario,
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  login(): void {

    if (this.form.invalid) {
      this.toastr.warning('Por favor completa todos los campos correctamente', 'Advertencia');
      return;
    }

    const usuario = {
      correo: this.form.get('correo')?.value,
      password: this.form.get('password')?.value
    };

    this.usuario.login(usuario).subscribe({
      next: (data) => {
        this.auth.guardarUsuario(data.data);
        this.toastr.success('Bienvenido a FreshBite', 'Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Correo o contraseña incorrectos', 'Error de acceso');
      }
    });
  }

}