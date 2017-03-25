import {Routes} from '@angular/router';
import {KittenListComponent} from './components/kittenlist/kittenlist';
import {KittenDetailsComponent} from './components/kittendetails/kittendetails';
import {KittenResolver} from './resolvers/kittenResolver';

export const APP_ROUTES: Routes = [
    {
        path: 'kitten/:id', resolve: {
        kitten: KittenResolver
    }, component: KittenDetailsComponent
    },
    { path: '', component: KittenListComponent }

];
