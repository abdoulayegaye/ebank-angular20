import {Injectable, signal} from '@angular/core';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Notification {

  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  success(message: string): void {
    this.add({ type: 'success', message });
  }

  error(message: string): void {
    this.add({ type: 'error', message });
  }

  warning(message: string): void {
    this.add({ type: 'warning', message });
  }

  info(message: string): void {
    this.add({ type: 'info', message });
  }

  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private add(toast: Omit<ToastMessage, 'id'>): void {
    const id = ++this.counter;
    this.toasts.update(toasts => [...toasts, { id, ...toast }]);
    // Auto-suppression après 4 secondes
    setTimeout(() => this.remove(id), 4000);
  }
}
