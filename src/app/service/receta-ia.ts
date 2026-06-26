import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecetaIa {

  // URL base de la API
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Obtiene las recetas sugeridas por la IA
   * según los productos disponibles en el
   * inventario del usuario.
   *
   * @param id_usuario Identificador del usuario.
   * @returns Observable con las recetas sugeridas.
   */
  recetas(id_usuario: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/ia/sugerir/${id_usuario}`
    );

  }

}