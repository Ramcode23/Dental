import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Apoinment } from '../models/apoinment.model';
import { map } from 'rxjs/operators';
import { DoctorService } from './doctor.service';

import { Person } from '../models/person.mode';
import { PatientsService } from './patients.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  doctors: Person[] = [];
  parients: Person[] = [];
  public apoiments: Apoinment[] = [];
  constructor(private firestone: AngularFirestore,
              private authService: AuthService,
              private doctorService: DoctorService,
              private patientsService: PatientsService
  ) { }

  addapoinment(apoinment: Apoinment) {
    apoinment.id = uuidv4();
    apoinment.user = this.authService.email;
    return this.firestone.collection('apoinments').doc(apoinment.id).set(apoinment);
  }

  getApoinments() {
    this.doctorService.getDoctors().subscribe(resp => this.doctors = resp);
    this.patientsService.getPatients().subscribe(resp => this.doctors = resp);
    return this.firestone.collection<Apoinment>('apoinments',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();

  }


  getApoinment(id: string) {
    return this.firestone.collection<Apoinment>('apoinments', ref => ref.where('id', '==', id)).valueChanges();

  }



  editApoinments(apoinment: Apoinment) {
    return this.firestone.collection('apoinments').doc(apoinment.id).update(apoinment);
  }
  deleteApoinments(apoinment: Apoinment) {
    return this.firestone.collection('apoinments').doc(apoinment.id).delete();
  }
}



