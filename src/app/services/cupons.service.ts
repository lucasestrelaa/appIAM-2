import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cupom } from '../interfaces/cupom';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuponsService {
  private cupomCollection : AngularFirestoreCollection<Cupom>;
  constructor(private afs: AngularFirestore) { 
    this.cupomCollection = afs.collection<Cupom>('Cupom');
  }
  getCupons(){
    return this.cupomCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
  }
  addCupom(cupom: Cupom){
    console.log(cupom);
  return this.cupomCollection.add(cupom);
  }
  getCupom(id: string){
    console.log("recuperado");
  return this.cupomCollection.doc<Cupom>(id).valueChanges();
  }
  updateCupom(id: string, cupom: Cupom ){
  return this.cupomCollection.doc<Cupom>(id).update(cupom);
  }
  deleteCupom(id: string){
  return this.cupomCollection.doc(id).delete();
  }
}
