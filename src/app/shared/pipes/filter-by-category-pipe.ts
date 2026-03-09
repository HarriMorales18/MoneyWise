import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from 'src/app/core/models/transaccion';


@Pipe({
  standalone: false,
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(transacciones: Transaccion[], categoria: string): Transaccion[] {
    if (!categoria || categoria === 'todas') return transacciones;
    return transacciones.filter(t => t.categoria === categoria);
  }
}