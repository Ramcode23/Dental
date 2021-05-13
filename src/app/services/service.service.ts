import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { Service } from '../models/service.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private firestone: AngularFirestore, private authService: AuthService) { }


  getservices() {

    return this.firestone.collection<Service>('services',
      ref => ref.where('user', '==',
        this.authService.email)).valueChanges();
  }


  getService(id: string) {

    return this.firestone.collection<Service>('services', ref => ref.where('id', '==', id)).valueChanges();
  }
  searchService(field: string) {

    return this.firestone.collection<Service>('services', ref => ref
      .where('user', '==', this.authService.email)
    ).valueChanges().pipe(
      map(serv => serv.filter(s => s.desc.includes(field))

      ));


  }

  addService(service: Service) {
    service.id = uuidv4();
    service.user = this.authService.email;

    return this.firestone.collection('services').doc(service.id).set(service);

  }

  editService(service: Service) {
    return this.firestone.collection('services').doc(service.id).update(service);
  }
}
