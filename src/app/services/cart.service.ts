import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  constructor() { }

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  updateCartItems(items: any[]): void {
    this.cartItemsSubject.next(items);
  }
}
