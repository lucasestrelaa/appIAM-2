import { Sorteio } from './../interfaces/sorteio';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SorteioService {
  private sorteioCollection : AngularFirestoreCollection<Sorteio>;
  constructor(private afs: AngularFirestore) {
    this.sorteioCollection = afs.collection<Sorteio>('Sorteio');
  }
  getSorteios(){
    return this.sorteioCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
  }
  addSorteio(sorteio: Sorteio){
    console.log(sorteio);
    return this.sorteioCollection.add(sorteio);
  }
  getSorteio(id: string){
    console.log("recuperadoSorteio");
    return this.sorteioCollection.doc<Sorteio>(id).valueChanges();
  }
  updateContVoto(id: string, sorteio: Sorteio ){
  return this.sorteioCollection.doc<Sorteio>(id).update(sorteio);
  }
  deleteContVoto(id: string){
  return this.sorteioCollection.doc(id).delete();
  }
}
