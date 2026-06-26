import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environment'

@Injectable({
  providedIn: 'root',
})
export class Inventario {
  
  private apiUrl=environment.apiUrl;
  constructor(private http:HttpClient){}

  getInventario(id_usuario:number):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/inventarios/grafica/${id_usuario}`)
  }
  getInventarioIdUsuario(id_usuario:number):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/inventarios/usuario/${id_usuario}`)
  }
  crearInventario(inventario:any):Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/inventarios`, inventario)
  }

  eliminarInventario(id_inventario:number):Observable<any>{
    return this.http.delete<any[]>(`${this.apiUrl}/inventarios/${id_inventario}`)
  }

  editarInventario(id_inventario:number, inventario:any): Observable<any> {
    return this.http.put<any[]>(`${this.apiUrl}/inventarios/${id_inventario}`, inventario)
  }

  getInventarioDespensa(id_usuario:number):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/inventarios/despensa/${id_usuario}`)
  }
}
