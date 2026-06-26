import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  usuario:any;
  mostrarMenu:boolean = false;


  constructor(
    private auth: Auth, 
    private router: Router
  ) {}
  ngOnInit(): void {
    this.usuario = this.auth.obtenerUsuario();
  }

  get inicial(): string {
    return this.usuario?.nombre
    ? this.usuario.nombre.charAt(0).toUpperCase()
    : '';
  }
  toggleMenu(): void {
    console.log('Click detectado');
    this.mostrarMenu = !this.mostrarMenu;
    console.log(this.mostrarMenu);
  }
  editarPerfil(): void {
    this.router.navigate(['/perfil']);
  }
  logout(): void {

    this.auth.logout();

   this.router.navigate(['/']);
}

}
