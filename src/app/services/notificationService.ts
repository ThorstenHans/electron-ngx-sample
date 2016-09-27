import {Injectable} from '@angular/core';

export interface INotification {

    onclick: () => void;
}

declare var Notification: any;

@Injectable()
export class NotificationService {

    public notify(title: string, body: string, icon: string = null): INotification {
        return <INotification>(new Notification(title, {
            body: body,
            icon: icon
        }));

    }
}
