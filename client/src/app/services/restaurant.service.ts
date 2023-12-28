import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../environment/environment";
import Restaurant from "../../Modelo/restaurante.interface";
import Routes from "../../Modelo/ruta.interface";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private listaRestaurantes: Restaurant[] = [];
  private listaRestaurantesSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();
  private rutaSubject: Subject<Routes> = new Subject<Routes>();
  private selectedRestaurantSubject: BehaviorSubject<Restaurant | null> = new BehaviorSubject<Restaurant | null>(null);


  selectedRestaurant$: Observable<Restaurant | null> = this.selectedRestaurantSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  enviarDatosAlBackend(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/preferences`, data);
  }

  obtenerRestaurantes(location: any): Observable<any> {
    const coordinatesString: string = `${location.lat},${location.lng}`;
    return this.http.get<any>(`${environment.BASE_URL}/api/restaurants/${coordinatesString}`);
  }

  obtenerInformacionRestaurantes(id_Restaurante: any): Observable<any> {
    let id = {id: `${id_Restaurante}`};
    return this.http.post<any>(`${environment.BASE_URL}/api/information`, id);
  }

  obtenerRutaRestaurante(id: any, ubication: any): Observable<any> {
    const data = {
      "location": {
        "latLng": {
          "latitude": ubication.lat,
          "longitude": ubication.lng
        }
      },
      "placeId": id
    }

    return this.http.post<any>(`${environment.BASE_URL}/api/routes`, data);
  }

  obtenerListaRestaurantes(): Restaurant[] {
    return this.listaRestaurantes;
  }

  actualizarListaRestaurantes(data: any): void {
    this.listaRestaurantes = data.restaurants || [];
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

  obtenerListaRestaurantesObservable(): Observable<Restaurant[]> {
    return this.listaRestaurantesSubject.asObservable();
  }

  setSelectedRestaurant(restaurant: Restaurant | null): void {
    this.selectedRestaurantSubject.next(restaurant);
  }

  getSelectedRestaurant(): Observable<Restaurant | null> {
    return this.selectedRestaurant$;
  }

  enviarRuta(ruta: Routes): void {
    this.rutaSubject.next(ruta);
  }

  recibirRuta(): Observable<Routes> {
    return this.rutaSubject.asObservable();
  }

}