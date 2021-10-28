import { Injectable } from '@angular/core';
import { RA } from '../interfaces/ra';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmRAService {
  private RACollection : AngularFirestoreCollection<RA>;

  constructor(private afs: AngularFirestore) {
    this.RACollection = afs.collection<RA>('RAs');
   }
   getRAs(){
    return this.RACollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
   }
   addRA(ra: RA){
    return this.RACollection.add(ra);
   }
   getRA(id: string){
    console.log("recuperado");
    return this.RACollection.doc<RA>(id).valueChanges();
   }
   updateRA(id: string, ra: RA ){
     
    return this.RACollection.doc<RA>(id).update(ra);
   }
   deleteRA(id: string){
    return this.RACollection.doc(id).delete();
  }
}
