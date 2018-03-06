import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";

@Injectable()
export class CatalogsService {

  private catalogs: { catalogName: string }[] = [];

  constructor(private storage: Storage) {
  }

  addCatalog(catalog: { catalogName: string }) {
    this.catalogs.push(catalog);
    this.storage.set('catalogs', this.catalogs);
  }

  getCatalogs() {
    return this.storage.get('catalogs')
      .then(
        (catalogs) => {
          this.catalogs = catalogs == null ? [] : catalogs;
          return this.catalogs.slice();
        }
      );
  }
}
