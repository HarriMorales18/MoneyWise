export interface Transaccion {
  id: string;

  tipo: 'ingreso' | 'gasto';

  categoria: string;

  fecha: Date;

  monto: number;

  descripcion?: string;

  comprobante?: string;

  imagen?: string;

  createdAt: Date;
}