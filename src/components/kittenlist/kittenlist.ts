import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Kitten} from '../../models/kitten';
import {KittenService} from '../../services/kittenService';
import {Subscription} from 'rxjs';

@Component({
    moduleId: module.id,
    styles: ['.clickable {cursor:pointer}'],
    templateUrl: 'kittenlist.html'
})
export class KittenListComponent implements OnInit, OnDestroy {
    private _kittenSubscription: Subscription;
    public kittens: Array<Kitten>;

    constructor(private _kittenService: KittenService, private _router: Router) {

    }

    public ngOnInit(): void {
        this._kittenSubscription = this._kittenService.getAllKittens()
            .subscribe(kittens => this.kittens = kittens);
    }

    public ngOnDestroy(): void {
        if (this._kittenSubscription && !this._kittenSubscription.closed) {
            this._kittenSubscription.unsubscribe();
        }
    }

    public openKitten(id: number) {
        this._router.navigate([`/kitten/${id}`]);
    }
}
