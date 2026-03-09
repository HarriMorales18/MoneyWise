import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { TransaccionService } from 'src/app/core/services/transaccion';
import { AnalyticsService } from 'src/app/core/services/analytics';
import { ResumenFinanciero } from 'src/app/core/models/resumen-financiero';

interface ChartSegment {
  categoria: string;
  monto: number;
  porcentaje: number;
  color: string;
  dashArray: string;
  dashOffset: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  private readonly chartColors = ['#0f766e', '#d97706', '#dc2626', '#2563eb', '#7c3aed', '#059669'];
  private readonly chartRadius = 72;
  private readonly chartCircumference = 2 * Math.PI * this.chartRadius;

  private transaccionesSub?: Subscription;

  resumen: ResumenFinanciero = {
    saldoActual: 0,
    totalIngresos: 0,
    totalGastos: 0,
    gastosPorCategoria: []
  };

  constructor(
    private transaccionService: TransaccionService,
    private analyticsService: AnalyticsService
  ) {}

  get currentMonthLabel(): string {
    return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date());
  }

  get chartSegments(): ChartSegment[] {
    let accumulatedOffset = 0;

    return [...this.resumen.gastosPorCategoria]
      .sort((left, right) => right.monto - left.monto)
      .map((item, index) => {
        const segmentLength = (item.porcentaje / 100) * this.chartCircumference;
        const segment: ChartSegment = {
          categoria: item.categoria,
          monto: item.monto,
          porcentaje: item.porcentaje,
          color: this.chartColors[index % this.chartColors.length],
          dashArray: `${segmentLength} ${this.chartCircumference - segmentLength}`,
          dashOffset: `${-accumulatedOffset}`
        };

        accumulatedOffset += segmentLength;
        return segment;
      });
  }

  get topCategory(): ChartSegment | null {
    return this.chartSegments[0] ?? null;
  }

  get remainingBalance(): number {
    return this.resumen.totalIngresos - this.resumen.totalGastos;
  }

  get spendingProgress(): number {
    if (this.resumen.totalIngresos <= 0) {
      return this.resumen.totalGastos > 0 ? 100 : 0;
    }

    return Math.min((this.resumen.totalGastos / this.resumen.totalIngresos) * 100, 100);
  }

  get spendingStatusLabel(): string {
    if (this.resumen.totalGastos === 0) {
      return 'Sin gastos registrados';
    }

    if (this.resumen.totalIngresos <= 0) {
      return 'Sin ingresos registrados';
    }

    if (this.resumen.totalGastos <= this.resumen.totalIngresos * 0.5) {
      return 'Gasto mensual bajo control';
    }

    if (this.resumen.totalGastos <= this.resumen.totalIngresos * 0.85) {
      return 'Gasto mensual estable';
    }

    return 'Atencion al ritmo de gasto';
  }

  trackByCategory(_: number, segment: ChartSegment): string {
    return segment.categoria;
  }

  ngOnInit() {
    this.transaccionesSub = this.transaccionService.transacciones$.subscribe(
      transacciones => {
        this.resumen = this.analyticsService.calcularResumen(transacciones);
      }
    );
  }

  ngOnDestroy() {
    this.transaccionesSub?.unsubscribe();
  }

}