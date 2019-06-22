import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RxDatabase } from 'rxdb';
import { DbService } from '@ec-core/services/database.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import {ApiService} from '@ec-core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseResolver implements Resolve<Promise<RxDatabase>> {
  constructor(private dbService: DbService, private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return fromPromise(this.dbService.init());
  }
}
