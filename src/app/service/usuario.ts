import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Usuario {

  // URL base de la API
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Autentica un usuario en el sistema.
   *
   * @param usuario Credenciales del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  login(usuario: any): Observable<any[]> {

    return this.http.post<any[]>(
      `${this.apiUrl}/usuarios/login`,
      usuario
    );

  }

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param usuario Información del nuevo usuario.
   * @returns Observable con la respuesta del servidor.
   */
  crearUsuario(usuario: any): Observable<any[]> {

    return this.http.post<any[]>(
      `${this.apiUrl}/usuarios`,
      usuario
    );

  }

  /**
   * Actualiza la información de un usuario.
   *
   * @param id_usuario Identificador del usuario.
   * @param usuario Información actualizada.
   * @returns Observable con la respuesta del servidor.
   */
  editarUsuario(
    id_usuario: number,
    usuario: any
  ): Observable<any[]> {

    return this.http.put<any[]>(
      `${this.apiUrl}/usuarios/${id_usuario}`,
      usuario
    );

  }

}