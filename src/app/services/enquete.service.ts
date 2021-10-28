import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Enquete } from '../interfaces/enquete';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EnqueteService {
  //private enqueteCollection: AngularFirestoreCollection<Enquete>;
  private enquetesCollection : AngularFirestoreCollection<Enquete>;

  constructor(private afs: AngularFirestore) {
    this.enquetesCollection = afs.collection<Enquete>('Enquetes');
   }

   getEnquetes(){
    return this.enquetesCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
   }
   addEnquete(enquete: Enquete){
    return this.enquetesCollection.add(enquete);
   }
   getEnquete(id: string){
    //console.log("recuperado");
    return this.enquetesCollection.doc<Enquete>(id).valueChanges();
   }
   updateEnquete(id: string, enquete: Enquete ){
     
    return this.enquetesCollection.doc<Enquete>(id).update(enquete);
   }
   deleteEnquete(id: string){
    return this.enquetesCollection.doc(id).delete();
  }
}
