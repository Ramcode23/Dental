import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  tooggle: boolean;
  constructor(public authService: AuthService, public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {

    this.saveLocal();
  }



  saveLocal() {
    localStorage.setItem('displayname', this.authService.displayName);
    localStorage.setItem('photoURL', this.authService.image);
  }

  hideSideBar(value: boolean) {

    debugger;
    this.tooggle = value;
  }

}
