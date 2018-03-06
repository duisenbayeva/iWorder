import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  catalogs: { catalogName: string }[] = [];

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

  openCatalog(catalog: { catalogName: string }) {

  }
}
