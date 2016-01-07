import {Component, OnInit} from 'angular2/core';

@Component({

    template: `
    	<h3>Welcome to Angular2</h3>
		<p>Check out <a href="http://www.angular.io">angular.io</a></p>`
})
export class SplashComponent implements OnInit {
		ngOnInit(){
			console.log('do some init here...')
		}
}