import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  
  constructor(private http: HttpClient) { }

  getLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve(position.coords);
          },
          (error: GeolocationPositionError) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  reverseGeocode(latitude: number, longitude: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.address) {
          const address = response.address;
          const parts = [
            address.road,
            address.village,
            address.city,
            address.state,
            address.country
          ];
          return parts.filter(part => part).join(', ');
        } else {
          throw new Error('No address found for the given coordinates.');
        }
      }),
      catchError(error => {
        throw new Error('Error fetching address: ' + error.message);
      })
    );
  }
}