import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {}

  async tomarFoto(): Promise<string | null> {

    try {

      return await this.capturarYGuardarFoto(CameraSource.Camera);

    } catch (error) {

      console.error('Error al tomar foto', error);

      return null;

    }

  }

  async seleccionarDeGaleria(): Promise<string | null> {

    try {

      return await this.capturarYGuardarFoto(CameraSource.Photos);

    } catch (error) {

      console.error('Error al seleccionar foto', error);

      return null;

    }

  }

  private async capturarYGuardarFoto(source: CameraSource): Promise<string | null> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });

    if (!image.base64String) {
      return null;
    }

    const fileName = `moneywise_${Date.now()}.${image.format || 'jpeg'}`;
    const saved = await Filesystem.writeFile({
      path: `comprobantes/${fileName}`,
      data: image.base64String,
      directory: Directory.Data,
      recursive: true
    });

    if (Capacitor.getPlatform() === 'web') {
      return `data:image/${image.format || 'jpeg'};base64,${image.base64String}`;
    }

    return Capacitor.convertFileSrc(saved.uri);
  }

}