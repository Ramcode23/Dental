import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Diagnostic } from '../models/diagnotic.model';


@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(private firestone: AngularFirestore, private authService: AuthService) { }
  getdiagnostics() {
    return this.firestone.collection<Diagnostic>('diagnostics',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();
  }


  getdiagnostic(id: string) {
    return this.firestone.collection<Diagnostic>('diagnostics', ref => ref.where('id', '==', id)).valueChanges();
  }

  searchdiagnostic(field: string) {
    return this.firestone.collection<Diagnostic>('diagnostics', ref => ref
      .where('user', '==', this.authService.email)
    ).valueChanges().pipe(
      map(serv => serv.filter(p => p.no.includes(field))
      ));
  }

  adddiagnostic({ doctor, patien, details, date }) {
    debugger;
    const id = uuidv4();
    const user = this.authService.email;
    const no = 'D00' + Date.now();
    return this.firestone.collection('diagnostics').doc(id).set({ no, date, id, user, doctor, patien, details });
  }
  editdiagnostic(diagnostic: Diagnostic) {
    return this.firestone.collection('diagnostics').doc(diagnostic.id).update(diagnostic);
  }







}








/*


.pipe(
  map(diagnosticsNumber => {
    debugger;
    if (diagnosticsNumber.length > 0) {
      const { no, id, user } = diagnosticsNumber[0];

      lastnnum = (Number(no) + 1).toString();

      this.firestone.collection('diagnosticsNumber').doc(id).update({ no: lastnnum, id, user });

    } else {
      const id = uuidv4();
      this.firestone.collection('diagnosticsNumber').doc(id).set({ id, no: lastnnum, user: this.authService.email });
    }

    return pather.slice(0, pather.length - lastnnum.toString().length) + lastnnum;
  })); */