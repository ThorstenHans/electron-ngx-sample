import {Component, OnInit} from '@angular/core';
import {Kitten} from '../../models/kitten';
import {NotificationService} from '../../services/notificationService';
import {ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'kittendetails.html'
})
export class KittenDetailsComponent implements OnInit {

    public kitten: Kitten = null;

    constructor(private _route: ActivatedRoute, private _notificationService: NotificationService) {

    }

    public ngOnInit(): void {
        this._route.data.forEach((data: { kitten: Kitten }) => {
            this.kitten = data.kitten;
        });
    }

    public notify() {
        let notification = this._notificationService.notify('Miou!', `This is ${this.kitten.name}, miou!`);
        notification.onclick = () => {
            // do something here
        };
    }
}
