import {Injectable} from "@angular/core";
import {Question} from "../model/question.model";


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

  getQuestions2(words, n) {
    console.log("words =", words, n);
    let array = this.getRandom(words, n);
    let questionArr = new Array(n);
    console.log("random n=", array, questionArr.length);
    for (let i = 0; i < questionArr.length; i++) {
      questionArr[i] = new Question(array[i], []);
      // questionArr[i].answers[0] = {answer: array[i].translation, correct: true, selected: false};
      questionArr[i].answers = this.getRandomAnswers(words, 2, array[i]).slice();
      console.log("getRandomAnswers", array[i], questionArr[i].answers);
    }
    console.log("Questions ready ", questionArr)

  }

  getRandom(arr, n) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      console.log("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  getRandomAnswers(arr, n, w) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      console.log("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      // console.log("x=", x, x in taken, taken);
      let temp = arr[x in taken ? taken[x] : x];
      // console.log("temp=", temp);
      if (temp != w) {
        result[n] = {answer: temp.translation, correct: false, selected: false};
        taken[x] = --len in taken ? taken[len] : len;
      } else n++;
    }
    result.push({answer: w.translation, correct: true, selected: false});
    return result;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
}
