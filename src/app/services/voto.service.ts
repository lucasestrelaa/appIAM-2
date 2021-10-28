import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Voto } from '../interfaces/voto';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VotoService {
  private votoCollection : AngularFirestoreCollection<Voto>;
  constructor(private afs: AngularFirestore) {
    this.votoCollection = afs.collection<Voto>('Voto');
  }
  getVotos(){
    return this.votoCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
  }
  addVoto(voto: Voto){
    console.log(voto);
    return this.votoCollection.add(voto);
  }
  getVoto(id: string){
    console.log("recuperado");
    return this.votoCollection.doc<Voto>(id).valueChanges();
  }
  updateVoto(id: string, voto: Voto ){
    return this.votoCollection.doc<Voto>(id).update(voto);
  }
  deleteVoto(id: string){
    return this.votoCollection.doc(id).delete();
  }
}
