import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Kitten} from '../../models/kitten';
import {KittenService} from '../../services/kittenService';

@Component({
  moduleId: module.id,
  styles: ['.clickable {cursor:pointer}'],
  templateUrl: 'kittenlist.html'
})
export class KittenListComponent implements OnInit {

  public kittens: Array<Kitten>;

  constructor(private _kittenService: KittenService, private _router: Router) {

  }

  public ngOnInit(): void {
    this.kittens = this._kittenService.getAllKittens();
  }

  public openKitten(id: number){
    this._router.navigate([`/kitten/${id}`]);
  }
}
