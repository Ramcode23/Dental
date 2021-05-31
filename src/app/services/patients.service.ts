import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from '../models/person.mode';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private firestone: AngularFirestore, private authService: AuthService) { }

  getPatients() {
    return this.firestone.collection<Person>('patients',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();
  }


  getPatient(id: string) {
    return this.firestone.collection<Person>('patients', ref => ref.where('id', '==', id)).valueChanges();
  }

  searchPatient(field: string) {
    return this.firestone.collection<Person>('patients', ref => ref
      .where('user', '==', this.authService.email)
    ).valueChanges().pipe(
      map(serv => serv.filter(p => p.name.includes(field))
      ));
  }

  addPatient(patient: Person) {
    patient.id = uuidv4();
    patient.user = this.authService.email;
    return this.firestone.collection('patients').doc(patient.id).set(patient);
  }
  editPatient(patient: Person) {
    return this.firestone.collection('patients').doc(patient.id).update(patient);
  }
}
