import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<Observable<any>> {
  constructor(private crudService: CrudService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    return this.crudService.getAllUsers();
    // .subscribe(
    //   (data: Product[]) => {
    //     this.users = data;
    //     console.log(this.users);
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(error.message);
    //   },
    // );
  }
}
