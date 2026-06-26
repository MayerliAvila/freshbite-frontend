import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Auth } from '../../service/auth';
import { RecetaIa } from '../../service/receta-ia';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recetas',
  imports: [Navbar, CommonModule],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css',
})
export class Recetas implements OnInit {
  usuarioActual: any = null;
  recetas: any[] = []

  constructor(
    private auth: Auth,
    private receta:RecetaIa,
    private toastr: ToastrService
  ){}
  
  ngOnInit():void{
    this.usuarioActual = this.auth.obtenerUsuario();
    this.obtenerReceta();
  }
  obtenerReceta():void{
    const usuarioId = this.usuarioActual.id_usuario;
    this.receta.recetas(usuarioId).subscribe({
      next:(data)=>{
        this.recetas = data.sugerencias.recetas;
      },
      error:(error)=>{
        console.error(error);
        this.toastr.error('Error al cargar las recetas sugeridas', 'Error');
      }
    });
  }

}
