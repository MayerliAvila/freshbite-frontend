import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environment'

@Injectable({
  providedIn: 'root',
})
export class RecetaIa {
  private apiUrl=environment.apiUrl;

  constructor(private http:HttpClient){}
  recetas(id_usuario:number): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/ia/sugerir/${id_usuario}`)
  }
}
