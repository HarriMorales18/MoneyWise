import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTransaccionPage } from './detalle-transaccion/detalle-transaccion.page';
import { ListaTransaccionesPage } from './lista-transacciones/lista-transacciones.page';

const routes: Routes = [
  { path: '', component: ListaTransaccionesPage }, // /tabs/transacciones
  { path: 'detalle/:id', component: DetalleTransaccionPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
