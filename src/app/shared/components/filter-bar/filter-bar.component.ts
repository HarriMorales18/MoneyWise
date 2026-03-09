import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CATEGORIAS } from 'src/app/core/constants/categorias';
import { TIPOS_TRANSACCION } from 'src/app/core/constants/tipos-transaccion';


@Component({
  standalone: false,
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {

  @Input() tipoSeleccionado: string = 'todos';
  @Input() categoriaSeleccionada: string = '';
  @Input() textoBusqueda: string = '';
  @Output() onTipoChange = new EventEmitter<string>();
  @Output() onCategoriaChange = new EventEmitter<string>();
  @Output() onBuscarChange = new EventEmitter<string>();

  tipos = ['todos', ...TIPOS_TRANSACCION];

  get categorias() {
    return CATEGORIAS
      .filter(c => this.tipoSeleccionado === 'todos' || c.tipo === this.tipoSeleccionado)
      .map(c => ({ label: c.nombre, value: c.nombre }));
  }

  cambiarTipo(tipo: string) {
    this.tipoSeleccionado = tipo || 'todos';
    this.onTipoChange.emit(this.tipoSeleccionado);
  }

  cambiarCategoria(categoria: string) {
    this.onCategoriaChange.emit(categoria || '');
  }

  buscar(event: any) {
    this.onBuscarChange.emit(event.detail.value);
  }

}