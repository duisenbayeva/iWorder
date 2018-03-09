import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Catalog, CatalogsService} from "../../services/catalogs.service";
import {NewCatalogPage} from "../new-catalog/new-catalog";
import {CatalogPage} from "../catalog/catalog";
import {FabContainer} from "ionic-angular";


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

  onClickNewCatalog(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(NewCatalogPage);
  }

  openCatalog(catalogName: string) {
    this.navCtrl.push(CatalogPage, {catalogName: catalogName});

  }
}
