import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { PatiensService } from '../../../services/patiens.service';
import { FormsService } from '../../../services/forms.service';
import { Person } from 'src/app/models/person.mode';


@Component({
  selector: 'app-patien',
  templateUrl: './patien.component.html',
  styleUrls: ['./patien.component.css']
})
export class PatienComponent implements OnInit {
  formPatien: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  countries: any;
  patien: Person;
  btnTitle: string;
  constructor(private patiensService: PatiensService,
              private countryService: CountryService,
              public formsService: FormsService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,

  ) { }


  ngOnInit(): void {

    this.initformPatien();
    this.getCountries();
    this.btnTitle = 'Save';

    if (this.route.snapshot.params.id) {
      this.patiensService
        .getPatien(this.route.snapshot.params.id)
        .subscribe(resp => {
          this.patien = resp[0];
          this.setFormData(this.patien);
          this.btnTitle = 'Edit';
        });
  }
}



    initformPatien() {
    this.formPatien = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      notes: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],

    });
    this.formPatien.reset();
  }


    getCountries() {
    this.countryService
      .getCountries().subscribe(
        (resp: any) => {
          this.countries = resp;
        }
      );
  }


    addPatien(patien: Person) {
    this.patiensService.addPatien(patien);
    this.router.navigateByUrl('/patients');

  }

    edit() {

    this.patien.name = this.formPatien.get('name').value;
    this.patien.email = this.formPatien.get('email').value;
    this.patien.notes = this.formPatien.get('notes').value;
    this.patien.country = this.formPatien.get('country').value;
    this.patien.gender = this.formPatien.get('gender').value;

    this.patiensService.editPatien(this.patien)
    .then(res => this.router
      .navigateByUrl('/admin/patiens'));

  }

    save(patien: Person) {
    debugger;
    if (this.formPatien.valid) {
      if (this.btnTitle === 'Save') {
        this.patiensService.addPatien(patien)
          .then(res => this.router
            .navigateByUrl('/patient'));
      } else {
        this.edit();
      }
    }

  }


    setFormData(patien: Person) {
    this.formPatien.get('name').setValue(patien.name);
    this.formPatien.get('email').setValue(patien.email);
    this.formPatien.get('notes').setValue(patien.notes);
    this.formPatien.get('country').setValue(patien.country);
    this.formPatien.get('gender').setValue(patien.gender);
  }

}



