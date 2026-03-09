import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from 'src/app/core/models/transaccion';
import { TransaccionService } from 'src/app/core/services/transaccion';


@Component({
  standalone: false,
  selector: 'app-formulario-transaccion-modal',
  templateUrl: './formulario-transaccion-modal.component.html',
  styleUrls: ['./formulario-transaccion-modal.component.scss'],
})
export class FormularioTransaccionModalComponent {

  @Input() transaccion?: Transaccion;

  constructor(
    private modalCtrl: ModalController,
    private transaccionService: TransaccionService
  ) {}

  async guardar(transaccionForm: Transaccion) {
    if (this.transaccion) {
      await this.transaccionService.actualizarTransaccion(transaccionForm);
    } else {
      await this.transaccionService.agregarTransaccion(transaccionForm);
    }
    this.modalCtrl.dismiss();
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}