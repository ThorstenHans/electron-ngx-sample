import {Injectable} from '@angular/core';
import {Kitten} from '../models/kitten';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {KittenService} from '../services/kittenService';

@Injectable()
export class KittenResolver implements Resolve<Kitten> {

    constructor(private _kittenService: KittenService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Kitten {
        return this._kittenService.getKittenById(parseInt(route.params['id']));
    }

}
