import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {KittenService} from './services/kittenService';
import {NotificationService} from './services/notificationService';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {KittenResolver} from './resolvers/kittenResolver';
import {appRoutingProviders, APP_ROUTING} from './appRoutes';
import {RootComponent} from './components/root/root';
import {KittenDetailsComponent} from './components/kittendetails/kittendetails';
import {KittenListComponent} from './components/kittenlist/kittenlist';
import {FooterComponent} from './components/footer/footer';

@NgModule({
    imports: [BrowserModule, APP_ROUTING],
    declarations: [RootComponent, KittenDetailsComponent, KittenListComponent, FooterComponent],
    bootstrap: [RootComponent],
    providers: [
        appRoutingProviders,
        KittenService,
        KittenResolver,
        NotificationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppModule {
}
