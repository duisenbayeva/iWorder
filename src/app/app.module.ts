import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {NewCatalogPage} from "../pages/new-catalog/new-catalog";

import {NewWordPage} from "../pages/new-word/new-word";
import {CatalogPage} from "../pages/catalog/catalog";

import {CatalogsService} from "../services/catalogs.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewCatalogPage,
    NewWordPage,
    CatalogPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewCatalogPage,
    NewWordPage,
    CatalogPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CatalogsService
  ]
})
export class AppModule {}
