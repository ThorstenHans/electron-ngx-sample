import {Injectable} from '@angular/core';
declare const Notification: any;

export interface INotification {
    onclick: () => void;
}

@Injectable()
export class NotificationService {

    public notify(title: string, body: string, icon: string = null): INotification {
        return <INotification>(new Notification(title, {
            body: body,
            icon: icon
        }));

    }
}
