import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { GraficoDespensa } from '../../components/grafico-despensa/grafico-despensa';
import { ResumenRapido } from '../../components/resumen-rapido/resumen-rapido';
import { AccionesRapidas } from '../../components/acciones-rapidas/acciones-rapidas';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, GraficoDespensa, ResumenRapido, AccionesRapidas],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  usuario:any;
  
  constructor(
    private auth:Auth,
    private router:Router,
  ){}
  

  ngOnInit(): void {

  if(!this.auth.estaAutenticado()){
    this.router.navigate(['/']);
    return;
  }

  this.usuario = this.auth.obtenerUsuario();
}
}
