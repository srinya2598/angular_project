import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {from, Observable} from 'rxjs';
import {RxDatabase} from 'rxdb';
import {DbService} from '@ec-core/services/database.service';

@Injectable()
export class HnResolver implements Resolve<Promise<RxDatabase>> {
  constructor(private DbService: DbService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return from(this.DbService.init());
  }
}
