import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../service/producto';
import { Inventario } from '../../service/inventario';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { Estado } from '../../service/estado';
import { Navbar } from '../../components/navbar/navbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css',
})
export class AgregarProducto implements OnInit {

  // Lista de productos disponibles
  productos: any[] = [];

  // Producto seleccionado por el usuario
  productoSeleccionado: any = null;

  // Información del usuario autenticado
  usuarioActual: any;

  // Formulario reactivo para agregar productos
  form!: FormGroup;

  // Lista de estados del producto
  estados: any[] = [];

  constructor(
    private producto: Producto,
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private inventario: Inventario,
    private estado: Estado,
    private toastr: ToastrService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el usuario autenticado, carga los productos
   * y crea el formulario.
   */
  ngOnInit(): void {

    // Obtiene la información del usuario autenticado
    this.usuarioActual = this.auth.obtenerUsuario();

    // Carga la lista de productos
    this.obtenerProducto();

    // Inicializa el formulario
    this.form = this.fb.group({
      producto: [null],
      cantidad: [0],
      fecha_vencimiento: ['']
    });
  }

  /**
   * Consulta la lista de productos desde la API.
   */
  obtenerProducto(): void {

    this.producto.obtenerProducto().subscribe({

      next: (data: any) => {
        this.productos = data;
      },

      error: (error) => {
        console.error(error);
        this.toastr.error('Error al obtener productos', 'Error');
      }

    });

  }

  /**
   * Consulta los estados registrados.
   */
  obtenerEstado(): void {

    this.estado.obtenerEstado().subscribe({

      next: (data) => {
        this.estado = data;
      },

      error: (error) => {
        console.log(error);
      }

    });

  }

  /**
   * Obtiene el producto seleccionado en el listado.
   *
   * @param event Evento generado por el select.
   */
  seleccionarProducto(event: Event): void {

    // Obtiene el id seleccionado
    const idSeleccionado = Number(
      (event.target as HTMLSelectElement).value
    );

    // Busca el producto correspondiente
    this.productoSeleccionado = this.productos.find(
      p => p.id_producto === idSeleccionado
    );

    console.log('Producto:', this.productoSeleccionado);
    console.log('Id Producto:', this.productoSeleccionado?.id_producto);
  }

  /**
   * Calcula el estado del producto según la fecha
   * de vencimiento.
   *
   * 1 = Fresco
   * 2 = Próximo a vencer
   * 3 = Vencido
   *
   * @param fechaVencimiento Fecha de vencimiento.
   * @returns Identificador del estado.
   */
  calcularEstadoId(fechaVencimiento: string): number {

    const hoy = new Date();

    const vencimiento = new Date(fechaVencimiento);

    // Elimina la hora para comparar únicamente las fechas
    hoy.setHours(0, 0, 0, 0);
    vencimiento.setHours(0, 0, 0, 0);

    const diferenciaMs =
      vencimiento.getTime() - hoy.getTime();

    const dias =
      Math.ceil(
        diferenciaMs / (1000 * 60 * 60 * 24)
      );

    // Estado: Vencido
    if (dias < 0) {
      return 3;
    }

    // Estado: Próximo a vencer
    if (dias <= 7) {
      return 2;
    }

    // Estado: Fresco
    return 1;
  }

  /**
   * Guarda un nuevo producto en el inventario.
   */
  guardarInventario(): void {

    // Valida que exista un producto seleccionado
    if (!this.productoSeleccionado) {
      this.toastr.warning('Por favor seleccione un producto', 'Advertencia');
      return;
    }

    // Valida que exista una fecha de vencimiento
    if (!this.form.value.fecha_vencimiento) {
      this.toastr.warning('Por favor seleccione una fecha de vencimiento', 'Advertencia');
      return;
    }

    // Calcula el estado del producto
    const estadoId = this.calcularEstadoId(
      this.form.value.fecha_vencimiento
    );

    // Objeto que será enviado al backend
    const nuevoRegistro = {
      usuario_id: this.usuarioActual.id_usuario,
      producto_id: this.productoSeleccionado.id_producto,
      cantidad: this.form.value.cantidad,
      fecha_vencimiento: this.form.value.fecha_vencimiento,
      estado_id: estadoId
    };

    // Guarda el producto en el inventario
    this.inventario.crearInventario(nuevoRegistro).subscribe({

      next: (response) => {

        this.toastr.success('Producto agregado a la despensa', 'Éxito');

        // Limpia el formulario
        this.form.reset({
          producto: null,
          cantidad: 0,
          fecha_vencimiento: ''
        });

        // Elimina la referencia al producto seleccionado
        this.productoSeleccionado = null;

      },

      error: (error) => {
        console.error(error);
        this.toastr.error('Error al agregar el producto', 'Error');
      }

    });

  }

  /**
   * Regresa a la vista principal del Dashboard.
   */
  regresar(): void {
    this.router.navigate(['/dashboard']);
  }

}