import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-photo-gallery-modal',
  templateUrl: './photo-gallery-modal.component.html',
  styleUrls: ['./photo-gallery-modal.component.scss'],
})
export class PhotoGalleryModalComponent {

  @Input() fotos: string[] = [];
  @Input() fotoInicial: number = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

}