import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<{ text: string, type: string }>();
  message$ = this.messageSubject.asObservable();

  showMessage(text: string, type: string) {
    this.messageSubject.next({ text, type });
  }
}
