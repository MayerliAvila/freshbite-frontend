import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class Estado {
   private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient){}

  obtenerEstado():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/estados`)
  }

}
