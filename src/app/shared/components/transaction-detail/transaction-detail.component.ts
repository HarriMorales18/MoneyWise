import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from '../../../core/models/transaccion';
import { PhotoGalleryModalComponent } from '../photo-gallery-modal/photo-gallery-modal.component';

@Component({
  standalone: false,
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent {

  @Input() transaccion!: Transaccion;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) {}

  get tipoColor() {
    return this.transaccion.tipo === 'ingreso' ? 'success' : 'danger';
  }

  handleEdit() {
    this.onEdit.emit();
  }

  handleDelete() {
    this.onDelete.emit();
  }

  async abrirGaleriaFotos() {
    if (!this.transaccion?.comprobante) {
      return;
    }

    const modal = await this.modalCtrl.create({
      component: PhotoGalleryModalComponent,
      componentProps: {
        fotos: [this.transaccion.comprobante],
        fotoInicial: 0
      }
    });

    await modal.present();
  }

}