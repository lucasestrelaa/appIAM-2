import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContVotoRa } from './../interfaces/cont-voto-ra';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContVotoRaService {
  private contVotoRaCollection : AngularFirestoreCollection<ContVotoRa>;
  constructor(private afs: AngularFirestore) {
    this.contVotoRaCollection = afs.collection<ContVotoRa>('ContVotoRa');
   }
  getContVotosRa(){
    return this.contVotoRaCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
  }
  addContVotoRa(contVotoRa: ContVotoRa){
    console.log(contVotoRa);
  return this.contVotoRaCollection.add(contVotoRa);
  }
  getContVotoRa(id: string){
    console.log("recuperadoContVotoRa");
  return this.contVotoRaCollection.doc<ContVotoRa>(id).valueChanges();
  }
  updateContVotoRa(id: string, contVotoRa: ContVotoRa ){
  return this.contVotoRaCollection.doc<ContVotoRa>(id).update(contVotoRa);
  }
  deleteContVotoRa(id: string){
  return this.contVotoRaCollection.doc(id).delete();
  }
}
