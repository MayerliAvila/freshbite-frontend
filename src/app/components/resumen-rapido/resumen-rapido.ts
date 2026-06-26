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

  usuarioActual: any;
  idUsuario!: number;

  totalFrescos: number = 0;
  totalProximos: number = 0;
  totalVencidos: number = 0;

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

    this.inventario.getInventario(this.idUsuario)
      .subscribe({

        next: (data) => {
          this.crearResumen(data);
        },

        error: (error) => {
          console.error(error);
          this.toastr.error('Error al obtener el resumen de inventario', 'Error');
        }

      });

  }

  crearResumen(data: any[]): void {

    this.totalFrescos = 0;
    this.totalProximos = 0;
    this.totalVencidos = 0;

    data.forEach(item => {

      if (item.estado === 'Fresco') {
        this.totalFrescos += item.cantidad;
      }

      if (item.estado === 'Próximo a vencer') {
        this.totalProximos += item.cantidad;
      }

      if (item.estado === 'Vencido') {
        this.totalVencidos += item.cantidad;
      }

    });
  }

}