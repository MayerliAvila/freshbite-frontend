import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Auth } from '../../service/auth';
import { RecetaIa } from '../../service/receta-ia';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recetas',
  imports: [
    Navbar,
    CommonModule
  ],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css',
})
export class Recetas implements OnInit {

  // Información del usuario autenticado
  usuarioActual: any = null;

  // Lista de recetas sugeridas
  recetas: any[] = [];

  constructor(
    private auth: Auth,
    private receta: RecetaIa,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el usuario autenticado y consulta
   * las recetas sugeridas.
   */
  ngOnInit(): void {

    // Obtiene la información del usuario autenticado
    this.usuarioActual = this.auth.obtenerUsuario();

    // Consulta las recetas sugeridas
    this.obtenerReceta();

  }

  /**
   * Consulta las recetas sugeridas para el usuario
   * autenticado utilizando el servicio de IA.
   */
  obtenerReceta(): void {

    // Obtiene el identificador del usuario
    const usuarioId = this.usuarioActual.id_usuario;

    // Consulta las recetas sugeridas
    this.receta.recetas(usuarioId).subscribe({

      next: (data) => {

        // Guarda las recetas obtenidas
        this.recetas = data.sugerencias.recetas;

      },

      error: (error) => {
        console.error(error);

        this.toastr.error(
          'Error al cargar las recetas sugeridas',
          'Error'
        );
      }

    });

  }

}