import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedItem: any;

  setItem(item: any) {
    this.selectedItem = item;
  }

  getItem() {
    return this.selectedItem;
  }
}