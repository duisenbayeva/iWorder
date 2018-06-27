import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import "firebase/firestore";

/*
 Generated class for the FirestoreProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class FirestoreProvider {

  private db: any;

  constructor() {
    this.db = firebase.firestore();
    console.log('Hello FirestoreProvider Provider');
  }

  getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            console.log(obj)
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }


        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
