import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  message: string | null = null;
  messageType: string | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.message$.subscribe(msg => {
      this.message = msg.text;
      this.messageType = msg.type;
      setTimeout(() => this.close(), 3000);
    });
  }

  close() {
    this.message = null;
    this.messageType = null;
  }
}
