import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from '../models/person.mode';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatiensService {

  constructor(private firestone: AngularFirestore, private authService: AuthService) { }

  getPatiens() {
    return this.firestone.collection<Person>('patiens',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();
  }


  getPatien(id: string) {
    return this.firestone.collection<Person>('patiens', ref => ref.where('id', '==', id)).valueChanges();
  }

  searchPatien(field: string) {
    return this.firestone.collection<Person>('patiens', ref => ref
      .where('user', '==', this.authService.email)
    ).valueChanges().pipe(
      map(serv => serv.filter(p => p.name.includes(field))
      ));
  }

  addPatien(patien: Person) {
    patien.id = uuidv4();
    patien.user = this.authService.email;
    return this.firestone.collection('patiens').doc(patien.id).set(patien);
  }
  editPatien(patien: Person) {
    return this.firestone.collection('patiens').doc(patien.id).update(patien);
  }
}
