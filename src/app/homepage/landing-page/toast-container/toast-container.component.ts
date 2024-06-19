import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
