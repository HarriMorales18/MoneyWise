import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent {

  @Input() titulo: string = '';
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'saldo' = 'saldo';
  @Input() icono: string = 'cash-outline';

  get color() {
    switch (this.tipo) {
      case 'ingreso': return 'success';
      case 'gasto': return 'danger';
      case 'saldo': return 'primary';
      default: return 'primary';
    }
  }

}