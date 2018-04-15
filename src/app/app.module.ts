import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
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
import {AuthProvider} from "../providers/auth/auth";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {LoginPage} from "../pages/login/login";

const firebaseConfig = {
  apiKey: "AIzaSyC8EakuoSZGOPVe9FCE8lzFy5EAhezszOM",
  authDomain: "worder-5c89a.firebaseapp.com",
  databaseURL: "https://worder-5c89a.firebaseio.com",
  projectId: "worder-5c89a",
  storageBucket: "worder-5c89a.appspot.com",
  messagingSenderId: "846607388450"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage, NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage, WordPage,
    QuizPage, LoginPage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, NewCatalogPage,
    NewWordPage, CatalogPage,
    GamePage, WordPage,
    QuizPage, LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CatalogsService,
    QuizService,
    Media,
    File,
    AuthProvider
  ]
})
export class AppModule {
}
