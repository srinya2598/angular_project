import {Injectable} from '@angular/core';
import {MESSAGE_SCHEMA} from '../../schema/message.schema';

import * as PouchdbAdapterIdb from "pouchdb-adapter-idb";
import RxDB, {RxCollection, RxDatabase} from 'rxdb';
import {environment} from '../../../environments/environment';

export enum RxCollections {
  MESSAGES = 'messages'

}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly _useAdapter = 'idb';
  private _db: RxDatabase;
  private _isDbResolved = false;

  async init() {
    if (!this._isDbResolved) {
      RxDB.plugin(PouchdbAdapterIdb);
      this._db = await RxDB.create({
        name: 'message_database',
        adapter: this._useAdapter,
        password: environment.dbPassword,
        multiInstance: false,
        queryChangeDetection: false
      });

      const schemaPromises = [
        this._db.collection({
          name: RxCollections.MESSAGES,
          schema: MESSAGE_SCHEMA,

        })
      ];

      await Promise.all(schemaPromises);
      this._isDbResolved = true;
    }
  }

  getCollection(name: RxCollections): RxCollection {
    return this._db.collections[name] as RxCollection;
  }

  async destroy() {
    await this._db.destroy();
  }

  async remove() {
    await this._db.remove();
  }
}
