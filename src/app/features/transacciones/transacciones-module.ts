import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaTransaccionesPage } from './lista-transacciones/lista-transacciones.page';

import { FormularioTransaccionModalComponent } from './formulario-transaccion-modal/formulario-transaccion-modal.component';
import { SharedModule } from '../../shared/shared-module';
import { TransaccionesRoutingModule } from './transacciones-routing-module';
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    TransaccionesRoutingModule
  ],
  declarations: [
    ListaTransaccionesPage,
    DetalleTransaccionPage,
    FormularioTransaccionModalComponent
  ]
})
export class TransaccionesModule {}