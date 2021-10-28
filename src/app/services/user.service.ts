import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map } from 'rxjs/operators';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection : AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    
  ) { 
    this.usersCollection = afs.collection<User>('Usuario');
  }
  getUsuarios(){
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
        });
      })
    )
   }
   addUsuario(id: string, user: User){
    return this.usersCollection.doc(id).set(user);
    //('Usuarios').doc
    this.usersCollection.add(user);
   }
   getUsuario(id: string){
    //console.log("recuperado");
    return this.usersCollection.doc<User>(id).valueChanges();
   }
   updateUsuario(id: string, user: User ){
     
    return this.usersCollection.doc<User>(id).update(user);
   }
   deleteUsuario(id: string){
    return this.usersCollection.doc(id).delete();
  }
}
