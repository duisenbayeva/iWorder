import {Injectable} from "@angular/core";
import {Question} from "../model/question.model";


@Injectable()
export class QuizService {
  // private catalogs: any[] = [];


  // constructor(private storage: Storage) {
  // }

  getQuestions() {

    let questions = [

      {
        "flashCardFlipped": false,
        "questionText": "What is this?",
        "answers": [
          {"answer": "Helicopter", "correct": true, "selected": false},
          {"answer": "Plane", "correct": false, "selected": false},
          {"answer": "Truck", "correct": false, "selected": false}
        ]
      },
      {
        "flashCardFlipped": false,
        "questionText": "What is this?",
        "answers": [
          {"answer": "Helicopter", "correct": false, "selected": false},
          {"answer": "Plane", "correct": true, "selected": false},
          {"answer": "Truck", "correct": false, "selected": false}
        ]
      },
      {
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
    for (let i = 0; i < questionArr.length; i++) {
      questionArr[i] = new Question(array[i], []);
      questionArr[i].answers = this.getRandomAnswers(words, 2, array[i]).slice();
    }
    console.log("Questions ready ", questionArr);
    return questionArr;
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
}
