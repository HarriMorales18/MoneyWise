import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../models/transaccion';
import { StorageService } from './storage';
import { AuthService } from './auth';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private STORAGE_KEY_PREFIX = 'transacciones';

  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  private currentUser: User | null = null;

  transacciones$ = this.transaccionesSubject.asObservable();

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.authService.usuario$.subscribe(usuario => {
      this.currentUser = usuario;
      void this.cargarTransacciones();
    });
  }

  async cargarTransacciones() {
    const storageKey = this.getStorageKeyForCurrentUser();

    if (!storageKey) {
      this.transaccionesSubject.next([]);
      return;
    }

    // Backward compatibility: migrate old global key once to the current user key.
    const migrado = await this.migrarClaveLegacy(storageKey);
    if (migrado) {
      return;
    }

    const data = await this.storageService.get(storageKey);

    this.transaccionesSubject.next(Array.isArray(data) ? data : []);

  }

  async obtenerTransacciones(): Promise<Transaccion[]> {
    await this.cargarTransacciones();
    return this.transaccionesSubject.value;
  }

  async agregarTransaccion(transaccion: Transaccion) {
    const storageKey = this.getStorageKeyForCurrentUser();

    if (!storageKey) {
      return;
    }

    const transacciones = this.transaccionesSubject.value;

    const nuevas = [...transacciones, transaccion];

    await this.storageService.set(storageKey, nuevas);

    this.transaccionesSubject.next(nuevas);

  }

  async actualizarTransaccion(transaccionActualizada: Transaccion) {
    const storageKey = this.getStorageKeyForCurrentUser();

    if (!storageKey) {
      return;
    }

    const transacciones = this.transaccionesSubject.value;

    const actualizadas = transacciones.map(t =>
      t.id === transaccionActualizada.id ? transaccionActualizada : t
    );

    await this.storageService.set(storageKey, actualizadas);

    this.transaccionesSubject.next(actualizadas);

  }

  async eliminarTransaccion(id: string) {
    const storageKey = this.getStorageKeyForCurrentUser();

    if (!storageKey) {
      return;
    }

    const transacciones = this.transaccionesSubject.value;

    const filtradas = transacciones.filter(t => t.id !== id);

    await this.storageService.set(storageKey, filtradas);

    this.transaccionesSubject.next(filtradas);

  }

  obtenerPorId(id: string): Transaccion | undefined {

    const transacciones = this.transaccionesSubject.value;

    return transacciones.find(t => t.id === id);

  }

  private getStorageKeyForCurrentUser(): string | null {
    const email = this.currentUser?.email?.trim().toLowerCase();
    if (!email) {
      return null;
    }

    return `${this.STORAGE_KEY_PREFIX}_${email}`;
  }

  private async migrarClaveLegacy(storageKey: string): Promise<boolean> {
    const dataActual = await this.storageService.get(storageKey);
    if (Array.isArray(dataActual)) {
      return false;
    }

    const legacyData = await this.storageService.get(this.STORAGE_KEY_PREFIX);
    if (!Array.isArray(legacyData) || legacyData.length === 0) {
      return false;
    }

    await this.storageService.set(storageKey, legacyData);
    await this.storageService.remove(this.STORAGE_KEY_PREFIX);
    this.transaccionesSubject.next(legacyData);
    return true;
  }

}