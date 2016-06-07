import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SplashComponent} from '../splash/splash';
import {APP_SERVICES} from '../../services/all';

@Component({
    moduleId: module.id,
    selector: 'sample-app',
    templateUrl: 'app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [APP_SERVICES]
})
@RouteConfig([
    {path: '/splash', name: 'Splash', useAsDefault: true, component: SplashComponent}
])
export class AppComponent {


}
