import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {KittenListComponent} from './components/kittenlist/kittenlist';
import {KittenDetailsComponent} from './components/kittendetails/kittendetails';
import {KittenResolver} from './resolvers/kittenResolver';

const appRoutes: Routes = [
    {
        path: 'kitten/:id', resolve: {
        kitten: KittenResolver
    }, component: KittenDetailsComponent
    },
    { path: '', component: KittenListComponent }

];

export const appRoutingProviders: any[] = [
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);
