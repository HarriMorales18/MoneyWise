export interface ResumenFinanciero {
  saldoActual: number;
  totalIngresos: number;
  totalGastos: number;
  gastosPorCategoria: {
    categoria: string;
    monto: number;
    porcentaje: number;
  }[];
}