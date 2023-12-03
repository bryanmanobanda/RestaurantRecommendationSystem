import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:3000'; // Reemplaza esto con la URL de tu backend

  constructor(private http: HttpClient) {}

  enviarDatosAlBackend(data: any): Observable<any> {
    // Envía los datos al backend usando HttpClient (reemplaza 'post' por el método HTTP que corresponda)
    return this.http.post<any>(`${this.apiUrl}/api/places`, data);
  }
}
