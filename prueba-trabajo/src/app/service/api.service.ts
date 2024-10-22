import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://calidad.cominvi.com.mx:8880/api/principal';

  constructor(private http: HttpClient) {}

  // Método para obtener los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario`);
  }

  // Método para obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario/${id}`);
  }

  // Método para agregar un nuevo usuario (POST)
  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Método para editar un usuario existente (PUT)
  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuario/${id}`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

   // Obtener productos desde el API
   getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto`);
  }

  guardarOrden(orden: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orden`, orden, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
    // Obtener todas las órdenes
    getOrdenes(): Observable<any> {
      return this.http.get(`${this.baseUrl}/orden`);  // Cambia el endpoint según tu API
    }
}