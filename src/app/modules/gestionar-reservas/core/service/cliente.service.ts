import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Cliente } from '../models/entidades';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url:string = 'http://localhost:9090/api/cliente'

  constructor(private http:HttpClient) {
  }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/readAll`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener los clientes:', error);
        throw error; // Puedes lanzar el error nuevamente o manejarlo según tus necesidades.
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/get/${id}`);
  }

  agregarCliente(objeto: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/save`, objeto);
  }

  actualizarCliente(id: number, objeto: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/put/${id}`, objeto);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`).pipe(
      tap(() => {
        // Realizar otras acciones después de una eliminación exitosa
        console.log('Cliente eliminado con éxito.');
        // Recargar la página
      }),catchError((error: any) => {
        console.error('Error al eliminar el cliente:', error);
        throw error;
      })
    );
  }
}
