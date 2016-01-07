import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {SplashComponent} from "../splash/splash.component";

@Component({
    selector: 'sampleapp',
    templateUrl: 'templates/app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/splash', name: 'Splash', useAsDefault: true, component: SplashComponent}
])
export class AppComponent {

	constructor(private _router: Router){
		_router.navigate(['Splash']);
	}

}
