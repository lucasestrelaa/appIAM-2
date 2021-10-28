import { Injectable } from '@angular/core';
import { Profissao } from '../interfaces/profissao';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmProfissaoService {
  private profissaoCollection : AngularFirestoreCollection<Profissao>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.profissaoCollection = afs.collection<Profissao>('Profissoes');
   }
   getProfissoes(){
    return this.profissaoCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
    
   }
   addProfissao(profissao: Profissao){
    return this.profissaoCollection.add(profissao);
   }
   getProfissao(id: string){
    console.log("recuperado");
    return this.profissaoCollection.doc<Profissao>(id).valueChanges();
   }
   updateProfissao(id: string, profissao: Profissao ){
     
    return this.profissaoCollection.doc<Profissao>(id).update(profissao);
   }
   deleteProfissao(id: string){
    return this.profissaoCollection.doc(id).delete();
  }
}
