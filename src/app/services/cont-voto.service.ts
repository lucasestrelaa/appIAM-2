import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContVoto } from '../interfaces/cont-voto';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContVotoService {
  private contVotoCollection : AngularFirestoreCollection<ContVoto>;
  constructor(private afs: AngularFirestore) { 
    this.contVotoCollection = afs.collection<ContVoto>('ContVoto');
  }
  getContVotos(){
    return this.contVotoCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
  }
  addContVoto(contVoto: ContVoto){
    console.log(contVoto);
  return this.contVotoCollection.add(contVoto);
  }
  getContVoto(id: string){
    console.log("recuperadoContVoto");
  return this.contVotoCollection.doc<ContVoto>(id).valueChanges();
  }
  updateContVoto(id: string, contVoto: ContVoto ){
  return this.contVotoCollection.doc<ContVoto>(id).update(contVoto);
  }
  deleteContVoto(id: string){
  return this.contVotoCollection.doc(id).delete();
  }
}
