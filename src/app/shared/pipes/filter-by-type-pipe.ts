import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from 'src/app/core/models/transaccion';


@Pipe({
  standalone: false,
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {
  transform(transacciones: Transaccion[], tipo: string): Transaccion[] {
    if (!tipo || tipo === 'todos') return transacciones;
    return transacciones.filter(t => t.tipo === tipo);
  }
}