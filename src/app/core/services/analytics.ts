import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion';
import { ResumenFinanciero } from '../models/resumen-financiero';
import { TransaccionService } from './transaccion';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private transaccionService: TransaccionService) {}

  calcularResumen(transacciones: Transaccion[]): ResumenFinanciero {

    const now = new Date();

    const transaccionesDelMes = transacciones.filter(t => this.isSameMonth(t.fecha, now));

    const ingresos = transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((total, t) => total + this.toNumber(t.monto), 0);

    const gastos = transacciones
      .filter(t => t.tipo === 'gasto')
      .reduce((total, t) => total + this.toNumber(t.monto), 0);

    const ingresosMes = transaccionesDelMes
      .filter(t => t.tipo === 'ingreso')
      .reduce((total, t) => total + this.toNumber(t.monto), 0);

    const gastosMes = transaccionesDelMes
      .filter(t => t.tipo === 'gasto')
      .reduce((total, t) => total + this.toNumber(t.monto), 0);

    const saldo = ingresos - gastos;

    const gastosPorCategoria: any = {};

    transacciones
      .filter(t => t.tipo === 'gasto')
      .forEach(t => {

        if (!gastosPorCategoria[t.categoria]) {
          gastosPorCategoria[t.categoria] = 0;
        }

        gastosPorCategoria[t.categoria] += this.toNumber(t.monto);

      });

    const totalGastos = gastos;

    const categorias = Object.keys(gastosPorCategoria).map(categoria => {

      const monto = gastosPorCategoria[categoria];

      return {
        categoria,
        monto,
        porcentaje: totalGastos ? (monto / totalGastos) * 100 : 0
      };

    });

    return {
      saldoActual: saldo,
      totalIngresos: ingresosMes,
      totalGastos: gastosMes,
      gastosPorCategoria: categorias
    };

  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    if (typeof value !== 'string') {
      return 0;
    }

    const sanitized = value.replace(/[^0-9-]/g, '');
    const parsed = Number(sanitized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private isSameMonth(value: unknown, reference: Date): boolean {
    const date = this.toDate(value);
    if (!date) {
      return false;
    }

    return (
      date.getFullYear() === reference.getFullYear() &&
      date.getMonth() === reference.getMonth()
    );
  }

  private toDate(value: unknown): Date | null {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
  }

}