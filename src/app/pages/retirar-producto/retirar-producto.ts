import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Inventario } from '../../service/inventario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retirar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './retirar-producto.html',
  styleUrl: './retirar-producto.css',
})
export class RetirarProducto implements OnInit {

  usuarioActual: any = null;
  productosInventario: any[] = [];
  cantidadEditar: number = 0;
  idInventarioEditar: number | null = null;
  guardando: boolean = false;

  // Para el modal de confirmación de eliminación
  idEliminarPendiente: number | null = null;

  constructor(
    private auth: Auth,
    private inventario: Inventario,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.auth.obtenerUsuario();
    this.obtenerInventario();
  }

  trackByInventario(index: number, producto: any): number {
    return producto.id_inventario;
  }

  obtenerInventario(): void {
    const idUsuario = this.usuarioActual.id_usuario;
    this.inventario.getInventarioIdUsuario(idUsuario).subscribe({
      next: (data) => {
        this.productosInventario = data;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error al obtener el inventario', 'Error');
      }
    });
  }

  abrirEdicion(producto: any): void {
    this.idInventarioEditar = producto.id_inventario;
    this.cantidadEditar = producto.cantidad;
  }

  cancelarEdicion(): void {
    this.idInventarioEditar = null;
  }

  guardarCantidad(): void {
    if (!this.idInventarioEditar || this.guardando) return;
    this.guardando = true;

    // Actualización optimista de la UI
    const index = this.productosInventario.findIndex(p => p.id_inventario === this.idInventarioEditar);
    if(index !== -1) {
      this.productosInventario[index].cantidad = this.cantidadEditar;
    }

    const idEdit = this.idInventarioEditar;
    
    // Quita la opción de seguir editando inmediatamente
    this.idInventarioEditar = null;

    this.inventario.editarInventario(idEdit, {
      cantidad: this.cantidadEditar
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.toastr.success('Cantidad actualizada correctamente', 'Éxito');
        this.obtenerInventario(); // ← recarga en segundo plano
      },
      error: (error) => {
        console.error(error);
        this.guardando = false;
        this.toastr.error('Error al actualizar la cantidad', 'Error');
        this.obtenerInventario(); // ← recarga para revertir si hubo error
      }
    });
  }

  // Abre el modal nativo en vez de confirm()
  solicitarEliminar(idInventario: number): void {
    this.idEliminarPendiente = idInventario;
  }

  confirmarEliminar(): void {
    if (!this.idEliminarPendiente) return;

    this.inventario.eliminarInventario(this.idEliminarPendiente).subscribe({
      next: () => {
        this.idEliminarPendiente = null;
        this.toastr.success('Producto eliminado del inventario', 'Éxito');
        this.obtenerInventario(); // ← recarga automática
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error al eliminar el producto', 'Error');
      }
    });
  }

  cancelarEliminar(): void {
    this.idEliminarPendiente = null;
  }
}