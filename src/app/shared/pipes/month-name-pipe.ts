import { Pipe, PipeTransform } from '@angular/core';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

@Pipe({
  standalone: false,
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value < 1 || value > 12) return '';
    return MESES[value - 1];
  }
}