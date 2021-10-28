import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContVotoProfissao } from './../interfaces/cont-voto-profissao';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContVotoProfissaoService {
  private contVotoProfissaoCollection : AngularFirestoreCollection<ContVotoProfissao>;
  constructor(private afs: AngularFirestore) {
    this.contVotoProfissaoCollection = afs.collection<ContVotoProfissao>('ContVotoProfissao');
   }
   getContVotosProfissao(){
    return this.contVotoProfissaoCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
  
        return { id, ...data };
        });
      })
    )
  }
    addContVotoProfissao(contVotoProfissao: ContVotoProfissao){
      console.log(contVotoProfissao);
      return this.contVotoProfissaoCollection.add(contVotoProfissao);
    }
    getContVotoProfissao(id: string){
      console.log("recuperadoContVotoProfissao");
    return this.contVotoProfissaoCollection.doc<ContVotoProfissao>(id).valueChanges();
    }
    updateContVotoProfissao(id: string, contVotoProfissao: ContVotoProfissao ){
    return this.contVotoProfissaoCollection.doc<ContVotoProfissao>(id).update(contVotoProfissao);
    }
    deleteContVotoProfissao(id: string){
    return this.contVotoProfissaoCollection.doc(id).delete();
    }
  
  
}
