import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {CatalogsService} from "./catalogs.service";
import {Catalog} from "../model/catalog.model";

@Injectable()
export class QuizService {
  private catalogs: Catalog[] = [];

  constructor(private catalogsService: CatalogsService, private storage: Storage) {
  }

  getQuestions() {
    this.storage.get('catalogs')
      .then(
        (catalogs) => {
          this.catalogs = catalogs == null ? [] : catalogs;
          console.log("catalogs=", this.catalogs);
          let c = this.getRandomIntInclusive(0, 10);
          console.log("c=", c, this.catalogs);
          // return this.catalogs.slice();
        }
      );

    let questions = [
      {
        question: "Which is the largest country in the world by population?",
        options: [{option: "India", correct: false, selected: false},
          {option: "USA", correct: false, selected: false}, {
            option: "China",
            correct: true, selected: false
          }, {option: "Russia", correct: false, selected: false}]
      },
      {
        question: "When did the second world war end?",
        options: [{option: "1945", correct: true, selected: false},
          {option: "1939", correct: false, selected: false}, {
            option: "1944",
            correct: false,
            selected: false
          }, {option: "1942", correct: false, selected: false}]
      }
    ];

    return questions;

  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
}
