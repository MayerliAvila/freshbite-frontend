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

    productos: any[] = [];

    productoSeleccionado: any = null;

    usuarioActual: any;

    form!: FormGroup;

    estados : any[] = []

    constructor(
      private producto: Producto,
      private fb: FormBuilder,
      private auth: Auth,
      private router: Router,
      private inventario: Inventario,
      private estado:Estado,
      private toastr: ToastrService
    ) {}

    ngOnInit(): void {

      this.usuarioActual = this.auth.obtenerUsuario();

      this.obtenerProducto();

      this.form = this.fb.group({
        producto: [''],
        cantidad: [1],
        fecha_vencimiento: ['']
      });
    }

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
    obtenerEstado(): void{
      this.estado.obtenerEstado().subscribe({
        next:(data)=>{
          this.estado = data;
        },
        error: (error)=>{
          console.log(error);
        }
      });
    }
    seleccionarProducto(event: Event): void {

      const idSeleccionado = Number(
        (event.target as HTMLSelectElement).value
      );

      this.productoSeleccionado = this.productos.find(
        p => p.id_producto === idSeleccionado
      );

      console.log('Producto:', this.productoSeleccionado);
      console.log('Id Producto:', this.productoSeleccionado?.id_producto);
    }
    calcularEstadoId(fechaVencimiento: string): number {

      const hoy = new Date();

      const vencimiento = new Date(fechaVencimiento);

      hoy.setHours(0,0,0,0);
      vencimiento.setHours(0,0,0,0);

      const diferenciaMs =
        vencimiento.getTime() - hoy.getTime();

      const dias =
        Math.ceil(
          diferenciaMs / (1000 * 60 * 60 * 24)
        );

      // VENCIDO
      if (dias < 0) {
        return 3;
      }

      // PRÓXIMO A VENCER
      if (dias <= 7) {
        return 2;
      }

      // FRESCO
      return 1;
    }

    guardarInventario(): void {

      if (!this.productoSeleccionado) {
        this.toastr.warning('Por favor seleccione un producto', 'Advertencia');
        return;
      }
      
      if (!this.form.value.fecha_vencimiento) {
        this.toastr.warning('Por favor seleccione una fecha de vencimiento', 'Advertencia');
        return;
      }
      
      const estadoId = this.calcularEstadoId(
      this.form.value.fecha_vencimiento
      );

      const nuevoRegistro = {
        usuario_id: this.usuarioActual.id_usuario,
        producto_id: this.productoSeleccionado.id_producto,
        cantidad: this.form.value.cantidad,
        fecha_vencimiento: this.form.value.fecha_vencimiento,
        estado_id: estadoId
      };

      this.inventario.crearInventario(nuevoRegistro).subscribe({
        next: (response) => {
          this.toastr.success('Producto agregado a la despensa', 'Éxito');
          this.form.reset({
            producto: '',
            cantidad: 1,
            fecha_vencimiento: ''
          });
          this.productoSeleccionado = null;
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Error al agregar el producto', 'Error');
        }
      });
    }
    regresar() : void{
      this.router.navigate(['/dashboard']);
    }
  }