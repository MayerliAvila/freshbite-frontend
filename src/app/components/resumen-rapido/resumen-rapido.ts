import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Inventario } from '../../service/inventario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resumen-rapido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-rapido.html',
  styleUrl: './resumen-rapido.css'
})
export class ResumenRapido implements OnInit {

  // Información del usuario autenticado
  usuarioActual: any;

  // Identificador del usuario
  idUsuario!: number;

  // Contadores para el resumen del inventario
  totalFrescos: number = 0;
  totalProximos: number = 0;
  totalVencidos: number = 0;

  constructor(
    private inventario: Inventario,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el usuario autenticado y consulta su inventario.
   */
  ngOnInit(): void {

    // Obtiene la información del usuario almacenada en la sesión
    this.usuarioActual = this.auth.obtenerUsuario();

    // Valida que exista un usuario autenticado
    if (!this.usuarioActual) {
      console.error('No existe usuario autenticado');
      return;
    }

    // Guarda el identificador del usuario
    this.idUsuario = this.usuarioActual.id_usuario;

    // Consulta el inventario del usuario
    this.obtenerInventario();
  }

  /**
   * Consulta el inventario del usuario desde la API
   * y genera el resumen de productos.
   */
  obtenerInventario(): void {

    this.inventario.getInventario(this.idUsuario)
      .subscribe({

        next: (data) => {

          // Procesa la información recibida
          this.crearResumen(data);
        },

        error: (error) => {
          console.error(error);
          this.toastr.error('Error al obtener el resumen de inventario', 'Error');
        }

      });
  }

  /**
   * Calcula la cantidad total de productos por estado.
   *
   * @param data Lista de productos del inventario.
   */
  crearResumen(data: any[]): void {

    // Reinicia los contadores antes de realizar el cálculo
    this.totalFrescos = 0;
    this.totalProximos = 0;
    this.totalVencidos = 0;

    // Recorre todos los productos del inventario
    data.forEach(item => {

      // Suma la cantidad de productos frescos
      if (item.estado === 'Fresco') {
        this.totalFrescos += item.cantidad;
      }

      // Suma la cantidad de productos próximos a vencer
      if (item.estado === 'Próximo a vencer') {
        this.totalProximos += item.cantidad;
      }

      // Suma la cantidad de productos vencidos
      if (item.estado === 'Vencido') {
        this.totalVencidos += item.cantidad;
      }

    });

  }

}