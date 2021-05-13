import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers: [AngularFireAuth]
})
export class LogComponent implements OnInit {
  emails: '';
  constructor(public auth: AngularFireAuth, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (this.auth.user) {
      this.router.navigateByUrl('/admin');

    }
  }

  login() {

    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.user.subscribe(u => {
      this.authService.SetUser(u);


      this.router.navigateByUrl('/admin');

    }

    );
  }
  logout() {
    this.auth.auth.signOut();
  }



}
