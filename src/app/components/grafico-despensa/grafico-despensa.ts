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

  usuarioActual: any;
  idUsuario!: number;

  grafica: Chart | null = null;

  constructor(
    private inventario: Inventario,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.usuarioActual = this.auth.obtenerUsuario();

    if (!this.usuarioActual) {
      console.error('No existe usuario autenticado');
      return;
    }

    this.idUsuario = this.usuarioActual.id_usuario;

    this.obtenerInventario();
  }

  obtenerInventario(): void {

    this.inventario
      .getInventario(this.idUsuario)
      .subscribe({

        next: (data) => {

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

  crearGrafica(data: any[]): void {

    const canvas = document.getElementById(
      'graficaDespensa'
    ) as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas no encontrado');
      return;
    }

    const categorias = [
      ...new Set(
        data.map(item => item.categoria)
      )
    ] as string[];

    const frescos: number[] = [];
    const proximos: number[] = [];
    const vencidos: number[] = [];

    categorias.forEach(categoria => {

      frescos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Fresco'
        )?.cantidad || 0
      );

      proximos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Próximo a vencer'
        )?.cantidad || 0
      );

      vencidos.push(
        data.find(
          item =>
            item.categoria === categoria &&
            item.estado === 'Vencido'
        )?.cantidad || 0
      );

    });

    if (this.grafica) {
      this.grafica.destroy();
    }

    this.grafica = new Chart(canvas, {

      type: 'bar',

      data: {

        labels: categorias,

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

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: 'top'
          }
        },

        scales: {
          y: {
            beginAtZero: true
          }
        }

      }

    });

  }

}