import { Categoria } from '../models/categoria';

export const CATEGORIAS: Categoria[] = [
  {
    nombre: 'Alimentación',
    icono: 'restaurant',
    color: '#FF6B6B',
    tipo: 'gasto'
  },
  {
    nombre: 'Transporte',
    icono: 'car',
    color: '#4ECDC4',
    tipo: 'gasto'
  },
  {
    nombre: 'Vivienda',
    icono: 'home',
    color: '#5C7CFA',
    tipo: 'gasto'
  },
  {
    nombre: 'Salud',
    icono: 'medkit',
    color: '#FF922B',
    tipo: 'gasto'
  },
  {
    nombre: 'Ocio',
    icono: 'game-controller',
    color: '#845EF7',
    tipo: 'gasto'
  },
  {
    nombre: 'Salario',
    icono: 'cash',
    color: '#51CF66',
    tipo: 'ingreso'
  },
  {
    nombre: 'Otros',
    icono: 'apps',
    color: '#868E96',
    tipo: 'ingreso'
  }
];