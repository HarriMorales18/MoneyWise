import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { FormularioTransaccionModalComponent } from '../formulario-transaccion-modal/formulario-transaccion-modal.component';
import { PhotoGalleryModalComponent } from 'src/app/shared/components/photo-gallery-modal/photo-gallery-modal.component';
import { TransaccionService } from 'src/app/core/services/transaccion';
import { Transaccion } from 'src/app/core/models/transaccion';
import { CATEGORIAS } from 'src/app/core/constants/categorias';

@Component({
  standalone: false,
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
})
export class ListaTransaccionesPage implements OnInit {

  transacciones: Transaccion[] = [];
  transaccionesFiltradas: Transaccion[] = [];

  tipoSeleccionado = 'todos';
  categoriaSeleccionada = '';
  textoBusqueda = '';

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    void this.cargarTransacciones();
  }

  async cargarTransacciones() {
    this.transacciones = await this.transaccionService.obtenerTransacciones();
    this.aplicarFiltros();
  }

  onTipoChange(tipo: string) {
    this.tipoSeleccionado = tipo || 'todos';

    // When switching to "todos", clear category so category filtering is refreshed.
    if (this.tipoSeleccionado === 'todos') {
      this.categoriaSeleccionada = '';
    } else if (this.categoriaSeleccionada) {
      const categoriaValida = CATEGORIAS.some(
        c => c.nombre === this.categoriaSeleccionada && c.tipo === this.tipoSeleccionado
      );

      if (!categoriaValida) {
        this.categoriaSeleccionada = '';
      }
    }

    this.aplicarFiltros();
  }

  onCategoriaChange(categoria: string) {
    this.categoriaSeleccionada = categoria || '';
    this.aplicarFiltros();
  }

  onBuscarChange(texto: string) {
    this.textoBusqueda = (texto || '').trim();
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    const texto = this.textoBusqueda.toLowerCase();

    this.transaccionesFiltradas = this.transacciones
      .filter(t => {
        const cumpleTipo =
          this.tipoSeleccionado === 'todos' || t.tipo === this.tipoSeleccionado;

        const cumpleCategoria =
          !this.categoriaSeleccionada ||
          t.categoria === this.categoriaSeleccionada;

        const cumpleBusqueda =
          !texto ||
          (t.descripcion || '').toLowerCase().includes(texto) ||
          t.categoria.toLowerCase().includes(texto);

        return cumpleTipo && cumpleCategoria && cumpleBusqueda;
      })
      .sort((a, b) => this.toTimestamp(b.fecha) - this.toTimestamp(a.fecha));
  }

  private toTimestamp(value: unknown): number {
    const date = new Date(value as string | number | Date);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
  }

  async abrirModal(transaccion?: Transaccion) {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModalComponent,
      componentProps: { transaccion }
    });

    modal.onDidDismiss().then(() => this.cargarTransacciones());
    return await modal.present();
  }

  irDetalle(transaccion: Transaccion) {
    this.router.navigate(['/tabs/transacciones/detalle', transaccion.id]);
  }

  async confirmarEliminar(transaccion: Transaccion, slidingItem?: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Deseas eliminar esta transacción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: async () => {
            await slidingItem?.close();
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.transaccionService.eliminarTransaccion(transaccion.id);
            await this.cargarTransacciones();
            await slidingItem?.close();
          }
        }
      ]
    });

    await alert.present();
  }

  async abrirPreviewFoto(transaccion: Transaccion) {
    if (!transaccion.comprobante) {
      return;
    }

    const modal = await this.modalCtrl.create({
      component: PhotoGalleryModalComponent,
      componentProps: {
        fotos: [transaccion.comprobante],
        fotoInicial: 0
      }
    });

    await modal.present();
  }
}