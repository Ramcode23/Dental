import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  show: boolean;
  layout: string;
  tooggle: string;
  @Output() toggled = new EventEmitter<boolean>();
  constructor(public authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router, @Inject(DOCUMENT)
    private document: Document

  ) {
    this.layout = '';
    this.tooggle = '';
    this.show = true;
  }

  ngOnInit(): void {
    this.hidemenu();
  }

  logOut() {
    this.auth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  hidemenu() {
    if (this.layout === 'sidebar-toggled') {
      this.document.body.classList.remove('sidebar-toggled');
      this.layout = '';
      this.tooggle = '';
      this.show = true;
    } else {
      this.layout = 'sidebar-toggled';
      this.document.body.classList.add('sidebar-toggled');
      this.tooggle = 'toggled';
      this.show = false;
    }
  }

  hideSeideBar(value: boolean) {
    this.hidemenu();
    this.toggled.emit(value);

  }




}
