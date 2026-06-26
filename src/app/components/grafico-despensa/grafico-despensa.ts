import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

import { Inventario } from '../../service/inventario';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grafico-despensa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico-despensa.html',
  styleUrl: './grafico-despensa.css'
})
export class GraficoDespensa implements OnInit {

  // Almacena la información del usuario autenticado
  usuarioActual: any;

  // Identificador del usuario
  idUsuario!: number;

  // Instancia de la gráfica de Chart.js
  grafica: Chart | null = null;

  constructor(
    private inventario: Inventario,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el usuario autenticado y carga el inventario.
   */
  ngOnInit(): void {

    // Obtiene el usuario almacenado en la sesión
    this.usuarioActual = this.auth.obtenerUsuario();

    // Valida que exista un usuario autenticado
    if (!this.usuarioActual) {
      console.error('No existe usuario autenticado');
      return;
    }

    // Guarda el id del usuario
    this.idUsuario = this.usuarioActual.id_usuario;

    // Consulta los productos del inventario
    this.obtenerInventario();
  }

  /**
   * Consulta el inventario del usuario y envía la información
   * para generar la gráfica.
   */
  obtenerInventario(): void {

    this.inventario
      .getInventario(this.idUsuario)
      .subscribe({

        next: (data) => {

          // Espera un momento para asegurar que el canvas exista
          setTimeout(() => {
            this.crearGrafica(data);
          }, 100);

        },

        error: (error) => {
          console.error(error);
          this.toastr.error('Error al cargar los datos del gráfico', 'Error');
        }

      });
  }

  /**
   * Genera la gráfica de barras utilizando Chart.js.
   * @param data Información del inventario enviada por la API.
   */
  crearGrafica(data: any[]): void {

    // Obtiene el elemento canvas donde se dibujará la gráfica
    const canvas = document.getElementById(
      'graficaDespensa'
    ) as HTMLCanvasElement;

    // Valida que el canvas exista
    if (!canvas) {
      console.error('Canvas no encontrado');
      return;
    }

    // Obtiene las categorías sin repetir
    const categorias = [
      ...new Set(
        data.map(item => item.categoria)
      )
    ] as string[];

    // Arreglos que almacenan la cantidad por estado
    const frescos: number[] = [];
    const proximos: number[] = [];
    const vencidos: number[] = [];

    // Recorre cada categoría y obtiene la cantidad
    // correspondiente a cada estado del producto
    categorias.forEach(categoria => {

      // Productos frescos
      frescos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Fresco'
        )?.cantidad || 0
      );

      // Productos próximos a vencer
      proximos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Próximo a vencer'
        )?.cantidad || 0
      );

      // Productos vencidos
      vencidos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Vencido'
        )?.cantidad || 0
      );

    });

    // Si ya existe una gráfica, la elimina antes de crear una nueva
    if (this.grafica) {
      this.grafica.destroy();
    }

    // Crea la gráfica de barras
    this.grafica = new Chart(canvas, {

      type: 'bar',

      data: {

        // Etiquetas del eje X
        labels: categorias,

        // Series de datos
        datasets: [
          {
            label: 'Fresco',
            data: frescos,
            backgroundColor: '#22c55e'
          },
          {
            label: 'Próximo a vencer',
            data: proximos,
            backgroundColor: '#facc15'
          },
          {
            label: 'Vencido',
            data: vencidos,
            backgroundColor: '#ef4444'
          }
        ]

      },

      options: {

        // Hace que la gráfica sea adaptable
        responsive: true,

        // Permite controlar la altura mediante CSS
        maintainAspectRatio: false,

        // Configuración de la leyenda
        plugins: {
          legend: {
            position: 'top'
          }
        },

        // Configuración de los ejes
        scales: {
          y: {
            beginAtZero: true
          }
        }

      }

    });

  }

}