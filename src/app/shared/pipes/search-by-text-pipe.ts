import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from 'src/app/core/models/transaccion';


@Pipe({
  standalone: false,
  name: 'searchByText'
})
export class SearchByTextPipe implements PipeTransform {
  transform(transacciones: Transaccion[], texto: string): Transaccion[] {
    if (!texto) return transacciones;
    return transacciones.filter(t => t.descripcion?.toLowerCase().includes(texto.toLowerCase()));
  }
}