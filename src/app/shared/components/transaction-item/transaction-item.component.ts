import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion';

@Component({
  standalone: false,
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent {

  @Input() transaccion!: Transaccion;
  @Output() onClick = new EventEmitter<void>();
  @Output() onPhotoClick = new EventEmitter<void>();

  get tipoColor() {
    return this.transaccion.tipo === 'ingreso' ? 'success' : 'danger';
  }

  handleClick() {
    this.onClick.emit();
  }

  handlePhotoClick(event: Event) {
    event.stopPropagation();
    this.onPhotoClick.emit();
  }

}