import {Injectable} from '@angular/core';
import {Kitten} from '../models/kitten';
import {Observable} from 'rxjs';

@Injectable()
export class KittenService {

    private _kittens = [];

    constructor() {
        this._kittens.push(new Kitten(1, 'Oreo', 340, 400));
        this._kittens.push(new Kitten(2, 'Lucy', 390, 360));
        this._kittens.push(new Kitten(3, 'Lily', 540, 340));
        this._kittens.push(new Kitten(4, 'Buddy', 470, 380));
    }

    public getAllKittens(): Observable<Array<Kitten>> {
        return Observable.of(this._kittens);
    }

    public getKittenById(id: number): Observable<Kitten> {
        return Observable.of(this._kittens.filter(kitten => kitten.id === id)[0]);
    }
}
