import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {

  @Input() mensaje: string = 'No hay datos';
  @Input() icono: string = 'alert-circle-outline';
  @Input() accion?: string;
  @Output() onAccion = new EventEmitter<void>();

  accionClick() {
    this.onAccion.emit();
  }

}