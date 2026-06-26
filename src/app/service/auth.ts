import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  /**
   * Guarda la información del usuario autenticado
   * en el almacenamiento local del navegador.
   *
   * @param usuario Información del usuario autenticado.
   */
  guardarUsuario(usuario: any): void {

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );

  }

  /**
   * Obtiene la información del usuario almacenada
   * en el almacenamiento local.
   *
   * @returns Objeto del usuario o null si no existe.
   */
  obtenerUsuario(): any {

    const usuario = localStorage.getItem('usuario');

    return usuario
      ? JSON.parse(usuario)
      : null;

  }

  /**
   * Verifica si existe un usuario autenticado.
   *
   * @returns true si hay un usuario almacenado,
   * false en caso contrario.
   */
  estaAutenticado(): boolean {

    return !!localStorage.getItem('usuario');

  }

  /**
   * Cierra la sesión del usuario eliminando
   * la información almacenada en el navegador.
   */
  logout(): void {

    localStorage.removeItem('usuario');

  }

}