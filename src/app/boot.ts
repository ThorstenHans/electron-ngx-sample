import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './components/app/app';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

bootstrap(AppComponent,
    [ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy })
    ]
);
