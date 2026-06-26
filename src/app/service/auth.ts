import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  guardarUsuario(usuario: any): void{
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  obtenerUsuario():any {
    const usuario=localStorage.getItem('usuario');

    return usuario
      ? JSON.parse(usuario)
      : null;
  }

  estaAutenticado():boolean{
    return !!localStorage.getItem('usuario');
  }
  logout(): void {
    localStorage.removeItem('usuario');
  }
}