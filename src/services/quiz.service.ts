import {Injectable} from "@angular/core";


@Injectable()
export class QuizService {
  // private catalogs: any[] = [];


  // constructor(private storage: Storage) {
  // }

  getQuestions() {
    // this.storage.get('catalogs')
    //   .then(
    //     (catalogs) => {
    //       this.catalogs = catalogs == null ? [] : catalogs;
    //       console.log("catalogs=", this.catalogs);
    //       let c = this.getRandomIntInclusive(0, 10);
    //       console.log("c=", c, this.catalogs);
    //       // return this.catalogs.slice();
    //     }
    //   );

    let questions = [

      {
        "flashCardFront": "<img src='assets/images/helicopter.png' />",
        "flashCardBack": "Helicopter",
        "flashCardFlipped": false,
        "questionText": "What is this?",
        "answers": [
          {"answer": "Helicopter", "correct": true, "selected": false},
          {"answer": "Plane", "correct": false, "selected": false},
          {"answer": "Truck", "correct": false, "selected": false}
        ]
      },
      {
        "flashCardFront": "<img src='assets/images/plane.png' />",
        "flashCardBack": "Plane",
        "flashCardFlipped": false,
        "questionText": "What is this?",
        "answers": [
          {"answer": "Helicopter", "correct": false, "selected": false},
          {"answer": "Plane", "correct": true, "selected": false},
          {"answer": "Truck", "correct": false, "selected": false}
        ]
      },
      {
        "flashCardFront": "<img src='assets/images/truck.png' />",
        "flashCardBack": "Truck",
        "flashCardFlipped": false,
        "questionText": "What is this?",
        "answers": [
          {"answer": "Helicopter", "correct": false, "selected": false},
          {"answer": "Plane", "correct": false, "selected": false},
          {"answer": "Truck", "correct": true, "selected": false}
        ]
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
