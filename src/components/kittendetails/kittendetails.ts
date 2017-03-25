import {Component, OnInit, NgZone} from '@angular/core';
import {Kitten} from '../../models/kitten';
import {NotificationService} from '../../services/notificationService';
import {ActivatedRoute} from '@angular/router';
import {ElectronService} from 'ngx-electron';

@Component({
    moduleId: module.id,
    templateUrl: 'kittendetails.html'
})
export class KittenDetailsComponent implements OnInit {

    public kitten: Kitten = null;
    public showNotificationButton: boolean = true;

    constructor(private _route: ActivatedRoute,
                private _notificationService: NotificationService,
                private _electronService: ElectronService,
                private _ngZone: NgZone) {

    }

    public ngOnInit(): void {
        this._route.data.forEach((data: { kitten: Kitten }) => {
            this.kitten = data.kitten;
        });
        if (ElectronService.runningInElectron) {
            this._electronService.ipcRenderer.on('toggle-notifications', () => {
                this._ngZone.run(() => {
                    this.showNotificationButton = !this.showNotificationButton;
                });
            });
        }
    }

    public notify() {
        let notification = this._notificationService.notify('Miou!',
            `This is ${this.kitten.name}, miou!`, `http://placekitten.com/100/100`);
        notification.onclick = () => {
            // do something here
        };
    }
}
