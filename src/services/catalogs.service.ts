export class CatalogsService{

  private catalogs: {catalogName : string}[]=[];

  addCatalog (catalog:{catalogName:string}){
    this.catalogs.push(catalog);
  }

  getCatalogs(){
    return this.catalogs.slice();
  }
}
