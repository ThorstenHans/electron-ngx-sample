import {Component, OnInit} from 'angular2/core';

@Component({

    templateUrl: 'templates/splash.html'
})
export class SplashComponent implements OnInit {
		ngOnInit(){
			console.log('do some init here...')
		}
}
