import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from '../../../services/forms.service';
import { Person } from 'src/app/models/person.mode';
import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  formPatient: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  countries: any;
  patient: Person;
  btnTitle: string;
  constructor(private patientsService: PatientsService,
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
      this.patientsService
        .getPatient(this.route.snapshot.params.id)
        .subscribe(resp => {
          this.patient = resp[0];
          this.setFormData(this.patient);
          this.btnTitle = 'Edit';
        });
  }
}



    initformPatien() {
    this.formPatient = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      notes: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],

    });
    this.formPatient.reset();
  }


    getCountries() {
    this.countryService
      .getCountries().subscribe(
        (resp: any) => {
          this.countries = resp;
        }
      );
  }


    addPatient(patient: Person) {
    this.patientsService.addPatient(patient);
    this.router.navigateByUrl('/admin/patients');

  }

    edit() {

    this.patient.name = this.formPatient.get('name').value;
    this.patient.email = this.formPatient.get('email').value;
    this.patient.notes = this.formPatient.get('notes').value;
    this.patient.country = this.formPatient.get('country').value;
    this.patient.gender = this.formPatient.get('gender').value;

    this.patientsService.editPatient(this.patient)
    .then(res => this.router
      .navigateByUrl('/admin/patients'));

  }

    save(patient: Person) {

    if (this.formPatient.valid) {
      if (this.btnTitle === 'Save') {
        this.patientsService.addPatient(patient)
          .then(res => this.router
            .navigateByUrl('/admin/patients'));
      } else {
        this.edit();
      }
    }

  }


    setFormData(patient: Person) {
    this.formPatient.get('name').setValue(patient.name);
    this.formPatient.get('email').setValue(patient.email);
    this.formPatient.get('notes').setValue(patient.notes);
    this.formPatient.get('country').setValue(patient.country);
    this.formPatient.get('gender').setValue(patient.gender);
  }

}



