import { Pipe, PipeTransform } from '@angular/core';

const COLORES: { [key: string]: string } = {
  alimentacion: '#FF6B6B',
  transporte: '#4ECDC4',
  vivienda: '#5C7CFA',
  salud: '#FF922B',
  ocio: '#845EF7',
  salario: '#51CF66',
  otros: '#868E96'
};

@Pipe({
  standalone: false,
  name: 'categoryColor'
})
export class CategoryColorPipe implements PipeTransform {
  transform(categoria: string): string {
    return COLORES[this.normalizarCategoria(categoria)] || '#000000';
  }

  private normalizarCategoria(categoria: string): string {
    return (categoria || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}