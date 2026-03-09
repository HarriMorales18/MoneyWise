import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera';


@Component({
  standalone: false,
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
})
export class PhotoSelectorComponent {

  @Input() fotoActual: string = '';
  @Output() onFotoSeleccionada = new EventEmitter<string>();
  @Output() onFotoEliminada = new EventEmitter<void>();

  constructor(private cameraService: CameraService) {}

  async tomarFoto() {
    const foto = await this.cameraService.tomarFoto();
    if (foto) {
      this.fotoActual = foto;
      this.onFotoSeleccionada.emit(foto);
    }
  }

  async seleccionarDeGaleria() {
    const foto = await this.cameraService.seleccionarDeGaleria();
    if (foto) {
      this.fotoActual = foto;
      this.onFotoSeleccionada.emit(foto);
    }
  }

  eliminarFoto() {
    this.fotoActual = '';
    this.onFotoEliminada.emit();
  }

}