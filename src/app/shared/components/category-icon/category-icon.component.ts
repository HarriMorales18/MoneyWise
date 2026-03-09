import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
})
export class CategoryIconComponent {

  @Input() categoria: string = '';
  @Input() tamaño: 'small' | 'medium' = 'medium';

  get dimension() {
    return this.tamaño === 'small' ? '40px' : '60px';
  }

  get icono() {
    switch (this.categoriaNormalizada) {
      case 'alimentacion': return 'restaurant-outline';
      case 'transporte': return 'bus-outline';
      case 'vivienda': return 'home-outline';
      case 'salud': return 'medkit-outline';
      case 'ocio': return 'game-controller-outline';
      case 'salario': return 'cash-outline';
      case 'otros': return 'apps-outline';
      default: return 'help-circle-outline';
    }
  }

  get color() {
    switch (this.categoriaNormalizada) {
      case 'alimentacion': return '#FF6B6B';
      case 'transporte': return '#4ECDC4';
      case 'vivienda': return '#5C7CFA';
      case 'salud': return '#FF922B';
      case 'ocio': return '#845EF7';
      case 'salario': return '#51CF66';
      case 'otros': return '#868E96';
      default: return '#1F2937';
    }
  }

  private get categoriaNormalizada(): string {
    return (this.categoria || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

}