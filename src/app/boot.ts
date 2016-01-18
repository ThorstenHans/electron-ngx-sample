import {provide} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';



bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy,
    { useClass: HashLocationStrategy })]);
