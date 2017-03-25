import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgxElectronModule} from 'ngx-electron';
import {APP_ROUTES} from './appRoutes';
import {ALL_COMPONENTS, BOOTSTRAP_COMPONENT} from './components/all';
import {ALL_RESOLVERS} from './resolvers/all';
import {ALL_SERVICES} from './services/all';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        NgxElectronModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    declarations: [...ALL_COMPONENTS],
    bootstrap: [BOOTSTRAP_COMPONENT],
    providers: [
        ...ALL_RESOLVERS,
        ...ALL_SERVICES
    ]
})
export class AppModule {

}
