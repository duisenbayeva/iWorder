import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Catalog, CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private catalogs: Catalog[] = [];

  constructor(public navCtrl: NavController, private catalogsService: CatalogsService) {
  }

  ionViewWillEnter() {
    this.catalogsService.getCatalogs().then(
      (catalogs) => this.catalogs = catalogs
    );
  }

  onClickNewCatalog() {
    this.navCtrl.push(NewCatalogPage);
  }

  openCatalog(catalogName: string) {

  }
}
