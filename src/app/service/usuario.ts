import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environment'

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  private apiUrl=environment.apiUrl;

  constructor(private http:HttpClient){}
  login(usuario:any): Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/usuarios/login`, usuario)
  }
  crearUsuario(usuario:any): Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/usuarios`, usuario)
  }

  editarUsuario(id_usuario:number, usuario:any) : Observable<any>{
    return this.http.put<any[]>(`${this.apiUrl}/usuarios/${id_usuario}`, usuario)
  }
}
