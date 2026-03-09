import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private readyPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.readyPromise = this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<void> {
    await this.readyPromise;
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    await this.readyPromise;
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.readyPromise;
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this.readyPromise;
    await this._storage?.clear();
  }

}

export { Storage };
