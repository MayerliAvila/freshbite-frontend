import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Inventario {

  // URL base de la API
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Obtiene la información del inventario utilizada
   * para generar el gráfico del Dashboard.
   *
   * @param id_usuario Identificador del usuario.
   * @returns Observable con los datos del inventario.
   */
  getInventario(id_usuario: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/inventarios/grafica/${id_usuario}`
    );

  }

  /**
   * Obtiene todos los productos registrados
   * en el inventario de un usuario.
   *
   * @param id_usuario Identificador del usuario.
   * @returns Observable con la lista del inventario.
   */
  getInventarioIdUsuario(id_usuario: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/inventarios/usuario/${id_usuario}`
    );

  }

  /**
   * Registra un nuevo producto en el inventario.
   *
   * @param inventario Información del producto.
   * @returns Observable con la respuesta del servidor.
   */
  crearInventario(inventario: any): Observable<any[]> {

    return this.http.post<any[]>(
      `${this.apiUrl}/inventarios`,
      inventario
    );

  }

  /**
   * Elimina un producto del inventario.
   *
   * @param id_inventario Identificador del registro.
   * @returns Observable con la respuesta del servidor.
   */
  eliminarInventario(id_inventario: number): Observable<any[]> {

    return this.http.delete<any[]>(
      `${this.apiUrl}/inventarios/${id_inventario}`
    );

  }

  /**
   * Actualiza la información de un producto
   * registrado en el inventario.
   *
   * @param id_inventario Identificador del registro.
   * @param inventario Información actualizada.
   * @returns Observable con la respuesta del servidor.
   */
  editarInventario(
    id_inventario: number,
    inventario: any
  ): Observable<any[]> {

    return this.http.put<any[]>(
      `${this.apiUrl}/inventarios/${id_inventario}`,
      inventario
    );

  }

  /**
   * Obtiene la información de la despensa del usuario.
   *
   * @param id_usuario Identificador del usuario.
   * @returns Observable con la lista de productos.
   */
  getInventarioDespensa(id_usuario: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/inventarios/despensa/${id_usuario}`
    );

  }

}