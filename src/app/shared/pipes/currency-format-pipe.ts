import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currency: string = 'COP'): string {
    if (value == null) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(value);
  }

}