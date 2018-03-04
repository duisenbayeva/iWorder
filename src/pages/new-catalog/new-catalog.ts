import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CatalogsService} from "../../services/catalogs.service";

@IonicPage()
@Component({
  selector: 'page-new-catalog',
  templateUrl: 'new-catalog.html',
})
export class NewCatalogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private catalogsService : CatalogsService) {
  }

  onAddCatalog(value : {catalogName : string}){
  this.catalogsService.addCatalog(value);
  }

}
