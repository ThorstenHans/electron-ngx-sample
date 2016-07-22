import { Component, OnInit, NgZone } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/heroService';
import { NotificationService } from '../../services/notificationService';

@Component({
    selector: 'hero-app',
    templateUrl: 'app/components/hero/heroComponent.html',
    styles: ['a {cursor:pointer;}'],
    providers: [HeroService, NotificationService]
})
export class HeroComponent implements OnInit{
    public title: string = 'Tour of Heroes';
    public hero: Hero = null;

    constructor(private _zone: NgZone, private _heroService: HeroService, private _notificationService: NotificationService){

    }

    public ngOnInit(): void {
      this.hero = this._heroService.getHero();
    }

    public sendNotification(){
      let notification = this._notificationService.notify('Hey Hero!', `This is ${this.hero.name} speaking`);
      notification.onclick = () => {
        this._zone.runOutsideAngular(() => { 
          this.hero.level ++;
          this._zone.run(()=>void 0);  
        });
        
      }
    }
}
