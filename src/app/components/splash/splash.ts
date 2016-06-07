import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'splash',
    templateUrl: 'splash.html'
})
export class SplashComponent implements OnInit {

        public ngOnInit(){
			console.log('do some init here...')
		}
}
