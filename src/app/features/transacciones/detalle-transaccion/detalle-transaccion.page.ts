import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, AlertController } from '@ionic/angular';
import { FormularioTransaccionModalComponent } from '../formulario-transaccion-modal/formulario-transaccion-modal.component';
import { Transaccion } from 'src/app/core/models/transaccion';
import { TransaccionService } from 'src/app/core/services/transaccion';

@Component({
  standalone: false,
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
})
export class DetalleTransaccionPage implements OnInit {

  transaccion!: Transaccion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  volverATransacciones() {
    this.router.navigate(['/tabs/transacciones']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const encontrada = this.transaccionService.obtenerPorId(id);
      if (encontrada) {
        this.transaccion = encontrada;
      }
    }
  }

  async editar() {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModalComponent,
      componentProps: { transaccion: this.transaccion }
    });

    modal.onDidDismiss().then(() => {
      const actualizada = this.transaccionService.obtenerPorId(this.transaccion.id);
      if (actualizada) {
        this.transaccion = actualizada;
      }
    });

    return await modal.present();
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Deseas eliminar esta transacción?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.transaccionService.eliminarTransaccion(this.transaccion.id);
            await this.router.navigate(['/tabs/transacciones'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }
}