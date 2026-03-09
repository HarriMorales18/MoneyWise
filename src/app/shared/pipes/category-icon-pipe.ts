import { Pipe, PipeTransform } from '@angular/core';

const ICONOS: { [key: string]: string } = {
  alimentacion: 'restaurant-outline',
  transporte: 'bus-outline',
  vivienda: 'home-outline',
  salud: 'medkit-outline',
  ocio: 'game-controller-outline',
  salario: 'cash-outline',
  otros: 'apps-outline'
};

@Pipe({
  standalone: false,
  name: 'categoryIcon'
})
export class CategoryIconPipe implements PipeTransform {
  transform(categoria: string): string {
    return ICONOS[this.normalizarCategoria(categoria)] || 'help-circle-outline';
  }

  private normalizarCategoria(categoria: string): string {
    return (categoria || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}