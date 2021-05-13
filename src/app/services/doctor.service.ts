import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Person } from '../models/person.mode';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private firestone: AngularFirestore, private authService: AuthService) { }

  getDoctors() {

    return this.firestone.collection<Person>('doctors',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();
  }


  getDoctor(id: string) {
    return this.firestone
      .collection<Person>('doctors',
        ref => ref.where('id', '==', id)).valueChanges();
  }

  searchDoctor(field: string) {
    return this.firestone.collection<Person>('doctors', ref => ref
      .where('user', '==', this.authService.email)
    ).valueChanges().pipe(
      map(serv => serv.filter(d => d.name.includes(field))
      ));
  }

  AddDoctor(doctor: Person) {
    doctor.id = uuidv4();
    doctor.user = this.authService.email;
    return this.firestone.collection('doctors').doc(doctor.id).set(doctor);
  }
  editDoctor(doctor: Person) {
    return this.firestone.collection('doctors').doc(doctor.id).update(doctor);
  }
}
