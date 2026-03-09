import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Servicios
import { AuthService } from './services/auth';
import { StorageService } from './services/storage';
import { TransaccionService } from './services/transaccion';
import { CameraService } from './services/camera';
import { AnalyticsService } from './services/analytics';

// Guards
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    AuthService,
    StorageService,
    TransaccionService,
    CameraService,
    AnalyticsService,
    AuthGuard
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya ha sido cargado. Importarlo solo en AppModule'
      );
    }
  }
}