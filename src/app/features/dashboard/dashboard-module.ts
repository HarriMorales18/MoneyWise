import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared-module';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardPage } from './dashboard/dashboard.page';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}