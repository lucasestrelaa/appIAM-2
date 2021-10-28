import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor(private afa: AngularFireAuth) { }
  get windowRef(){
    return window;
  }
  getAuth() {
    return this.afa;
  }
}
