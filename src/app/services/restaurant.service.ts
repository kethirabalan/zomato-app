import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://your-api-url'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addRestaurant(restaurant: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/restaurants`, restaurant);
  }
}
