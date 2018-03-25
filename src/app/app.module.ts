import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {NewCatalogPage} from "../pages/new-catalog/new-catalog";
import {NewWordPage} from "../pages/new-word/new-word";
import {CatalogPage} from "../pages/catalog/catalog";

import {CatalogsService} from "../services/catalogs.service";
import {GamePage} from "../pages/game/game";
import {WordPage} from "../pages/word/word";
import {QuizService} from "../services/quiz.service";
import {QuizPage} from "../pages/quiz/quiz";

@NgModule({
  declarations: [
    MyApp,
    HomePage,NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage,WordPage, QuizPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage, WordPage, QuizPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CatalogsService, QuizService
  ]
})
export class AppModule {
}
