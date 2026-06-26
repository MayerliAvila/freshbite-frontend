import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Estado {

  // URL base de la API
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Obtiene la lista de estados registrados
   * desde la API.
   *
   * @returns Observable con la lista de estados.
   */
  obtenerEstado(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/estados`
    );

  }

}