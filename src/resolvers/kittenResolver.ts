import {Injectable} from '@angular/core';
import {Kitten} from '../models/kitten';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {KittenService} from '../services/kittenService';
import {Observable} from 'rxjs';

@Injectable()
export class KittenResolver implements Resolve<Kitten> {

    constructor(private _kittenService: KittenService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Kitten> {
        return this._kittenService.getKittenById(parseInt(route.params['id']));
    }

}
