import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';

@Injectable()
export class HeroService{
    
    private _heroes = [];

    constructor() {
        this._heroes.push(new Hero(1, 'Batman'));
        this._heroes.push(new Hero(2, 'Robin'));
        this._heroes.push(new Hero(3, 'Catwoman'));
    }

    public getHero(): Hero {
        let id = Math.floor((Math.random() * this._heroes.length) + 1);
        return this._heroes[id-1];
    }

}