import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  private isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  transform(value: string | Date): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const now = new Date();
    const yesterday = new Date(now);

    yesterday.setDate(now.getDate() - 1);

    if (this.isSameDay(date, now)) {
      return 'Hoy';
    }

    if (this.isSameDay(date, yesterday)) {
      return 'Ayer';
    }

    return this.formatDate(date);
  }
}