import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Vuelo } from '../models/entidades';


@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private url:string = 'http://localhost:9090/api/vuelo'

  constructor(private http:HttpClient) {
  }

  public getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.url}/readAll`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener los vuelos:', error);
        throw error;
      })
    );
  }

  getVuelo(id: number): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.url}/get/${id}`);
  }

  agregarVuelo(objeto: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(`${this.url}/save`, objeto);
  }

  actualizarVuelo(id: number, objeto: Vuelo): Observable<Vuelo> {
    return this.http.put<Vuelo>(`${this.url}/put/${id}`, objeto);
  }

  eliminarVuelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`).pipe(
      tap(() => {
        console.log('Vuelo eliminado con éxito.');
        // Recargar la página
      }),catchError((error: any) => {
        console.error('Error al eliminar el vuelo:', error);
        throw error;
      })
    );
  }
}
