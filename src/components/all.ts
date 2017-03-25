import {FooterComponent} from './footer/footer';
import {KittenListComponent} from './kittenlist/kittenlist';
import {KittenDetailsComponent} from './kittendetails/kittendetails';
import {RootComponent} from './root/root';

export const ALL_COMPONENTS: Array<any> = [
    RootComponent,
    KittenDetailsComponent,
    KittenListComponent,
    FooterComponent
];

export const BOOTSTRAP_COMPONENT: any = RootComponent;
