import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

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

  ionViewWillEnter() {
    console.log('ionViewWillEnter NewCatalogPage', this.navParams);
    this.create = this.navParams.get('create');
    if (!this.create) {
      this.catalogName = this.navParams.get('catalogName');
      this.oldCatalogName = this.navParams.get('catalogName');
    } else {
      this.catalogName = "";
    }
    console.log("create=", this.create, this.catalogName)
  }

  onAddCatalog() {
    console.log("add! create=", this.catalogName);
    this.catalogsService.addCatalog(this.catalogName);
    this.navCtrl.pop();
  }

  onEditCatalog() {
    console.log("edit cat! ", this.catalogName, this.oldCatalogName);
    this.catalogsService.editCatalog(this.oldCatalogName, this.catalogName);
    this.navCtrl.pop();
  }

}
