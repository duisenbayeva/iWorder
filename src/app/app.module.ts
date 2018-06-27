import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from "./app.component";
import {NewCatalogPage} from "../pages/new-catalog/new-catalog";
import {NewWordPage} from "../pages/new-word/new-word";
import {CatalogPage} from "../pages/catalog/catalog";

import {CatalogsService} from "../services/catalogs.service";
import {GamePage} from "../pages/game/game";
import {WordPage} from "../pages/word/word";
import {QuizService} from "../services/quiz.service";
import {QuizPage} from "../pages/quiz/quiz";
import {FlashCardComponent} from "../components/flash-card/flash-card";

import {Media} from "@ionic-native/media";
import {File} from "@ionic-native/file";

import {Http, HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";
import {FirestoreProvider} from "../providers/firestore/firestore";
import {HttpClientModule} from "@angular/common/http";
import * as firebase from "firebase";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

var firebaseConfig = {
  apiKey: "AIzaSyC8EakuoSZGOPVe9FCE8lzFy5EAhezszOM",
  authDomain: "worder-5c89a.firebaseapp.com",
  databaseURL: "https://worder-5c89a.firebaseio.com",
  projectId: "worder-5c89a",
  storageBucket: "worder-5c89a.appspot.com",
  messagingSenderId: "846607388450"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage, WordPage,
    QuizPage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage, WordPage,
    QuizPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CatalogsService,
    QuizService,
    Media,
    File,
    FirestoreProvider
  ]
})
export class AppModule {
}
