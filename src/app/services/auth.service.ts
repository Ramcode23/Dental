import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  constructor() { }

  public get displayName(): string {

    return localStorage.getItem('displayname');
  }
  public get image(): string {

    return localStorage.getItem('photoURL');
  }
  public get email(): string {

    return localStorage.getItem('email');
  }



  SetUser(user: User) {
    
    this.user = user;
    if (!this.user) {

      localStorage.setItem('displayname', '');
      localStorage.setItem('photoURL', '../../../assets/img/no-img.jpg');
      localStorage.setItem('email', '');
      
    } else {

      localStorage.setItem('displayname', user.displayName);
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('email', user.email);
    }

    console.log(this.user);
  }





}
