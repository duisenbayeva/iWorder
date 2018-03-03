import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewCatalogPage} from "../new-catalog/new-catalog";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onClickNewCatalog(){
    this.navCtrl.push(NewCatalogPage);
  }

}
