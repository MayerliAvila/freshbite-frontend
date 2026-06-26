import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../service/inventario';
import { Auth } from '../../service/auth';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-despensa',
  standalone: true,
  imports: [
    Navbar,
    CommonModule,
    FormsModule
  ],
  templateUrl: './despensa.html',
  styleUrl: './despensa.css',
})
export class Despensa implements OnInit {

  usuarioActual: any = null;

  productosInventario: any[] = [];

  productosFiltrados: any[] = [];

  textoBusqueda: string = '';

  columnaOrden: string = '';

  direccionOrden: 'asc' | 'desc' = 'asc';

  constructor(
    private auth: Auth,
    private inventario: Inventario,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.usuarioActual = this.auth.obtenerUsuario();

    this.obtenerDespensa();
  }

  obtenerDespensa(): void {

    const idUsuario = this.usuarioActual.id_usuario;

    this.inventario.getInventarioDespensa(idUsuario).subscribe({

      next: (data: any) => {

        this.productosInventario = data;

        this.productosFiltrados = [...data];

      },

      error: (error) => {
        console.error(error);
        this.toastr.error('Error al obtener la despensa', 'Error');
      }

    });
  }

  filtrarTabla(): void {

    const texto =
      this.textoBusqueda.toLowerCase();

    this.productosFiltrados =
      this.productosInventario.filter(producto =>

        producto.nombre_producto
          ?.toLowerCase()
          .includes(texto)

        ||

        producto.categoria
          ?.toLowerCase()
          .includes(texto)

        ||

        producto.estado
          ?.toLowerCase()
          .includes(texto)

        ||

        producto.fecha_vencimiento
          ?.toString()
          .includes(texto)

        ||

        producto.cantidad
          ?.toString()
          .includes(texto)

      );
  }

  ordenarPor(columna: string): void {

    if (this.columnaOrden === columna) {

      this.direccionOrden =
        this.direccionOrden === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.columnaOrden = columna;

      this.direccionOrden = 'asc';
    }

    this.productosFiltrados.sort((a, b) => {

      let valorA = a[columna];
      let valorB = b[columna];

      if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase();
        valorB = valorB.toLowerCase();
      }

      if (valorA < valorB) {
        return this.direccionOrden === 'asc'
          ? -1
          : 1;
      }

      if (valorA > valorB) {
        return this.direccionOrden === 'asc'
          ? 1
          : -1;
      }

      return 0;
    });
  }

}