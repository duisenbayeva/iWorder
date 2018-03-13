import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {CatalogsService} from "../../services/catalogs.service";

@IonicPage()
@Component({
  selector: 'page-new-catalog',
  templateUrl: 'new-catalog.html',
})
export class NewCatalogPage {
  private create: boolean = true;
  private catalogName: string = "";
  private oldCatalogName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private catalogsService: CatalogsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWordPage');
    console.log(this.navParams);
  }

  ionViewWillEnter() {
    this.create = this.navParams.get('create');
    if (!this.create) {
      this.catalogName = this.navParams.get('catalogName').catalogName;
      this.oldCatalogName = this.navParams.get('catalogName').catalogName;
    } else {
      this.catalogName = "";
    }
    console.log("create=", this.create, this.catalogName)
  }

  onAddCatalog(value: string) {
    this.catalogsService.addCatalog(value);
    this.navCtrl.pop();
  }

  onEditCatalog(value: string) {
    console.log("edit! create=", this.create, this.catalogName, this.oldCatalogName)
    this.catalogsService.editCatalog(this.oldCatalogName, this.catalogName);
    this.navCtrl.pop();
  }

}
