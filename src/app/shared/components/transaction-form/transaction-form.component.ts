import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaccion } from '../../../core/models/transaccion';
import { CATEGORIAS } from 'src/app/core/constants/categorias';
import { TIPOS_TRANSACCION } from 'src/app/core/constants/tipos-transaccion';


@Component({
  standalone: false,
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {

  @Input() transaccion?: Transaccion; // para edición
  @Output() onSave = new EventEmitter<Transaccion>();
  @Output() onCancel = new EventEmitter<void>();

  form!: FormGroup;
  categorias = CATEGORIAS.map(c => ({ label: c.nombre, value: c.nombre }));
  tipos = TIPOS_TRANSACCION;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.transaccion) {
      this.transaccion = {
        id: Date.now().toString(),
        tipo: 'gasto',
        categoria: '',
        fecha: new Date(),
        monto: 0,
        descripcion: '',
        createdAt: new Date()
      };
    }

    this.form = this.fb.group({
      tipo: [this.transaccion?.tipo || 'gasto', Validators.required],
      categoria: [this.transaccion?.categoria || '', Validators.required],
      fecha: [this.transaccion?.fecha || new Date().toISOString(), Validators.required],
      monto: [this.transaccion?.monto || null, [Validators.required, Validators.min(0.01)]],
      descripcion: [this.transaccion?.descripcion || ''],
      comprobante: [this.transaccion?.comprobante || '']
    });
  }

  get f() {
    return this.form.controls;
  }

  guardar() {
    if (this.form.valid) {
      const value = this.form.value;
      const fecha = value.fecha instanceof Date ? value.fecha : new Date(value.fecha);
      const monto = typeof value.monto === 'number' ? value.monto : Number(value.monto);

      const payload: Transaccion = {
        id: this.transaccion?.id || Date.now().toString(),
        createdAt: this.transaccion?.createdAt || new Date(),
        tipo: value.tipo,
        categoria: value.categoria,
        fecha,
        monto,
        descripcion: value.descripcion || '',
        comprobante: value.comprobante || ''
      };

      this.onSave.emit(payload);
    }
  }

  cancelar() {
    this.onCancel.emit();
  }

  fotoSeleccionada(foto: string) {
    this.form.patchValue({ comprobante: foto });
  }

  fotoEliminada() {
    this.form.patchValue({ comprobante: '' });
  }

}