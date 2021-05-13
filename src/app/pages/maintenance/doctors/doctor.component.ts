import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';
import { Person } from '../../../models/person.mode';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  countries: any;
  public doctor: Person;
  private isEmail = /\S+@\S+\.\S+/;
  btnTitle: string;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private countryService: CountryService,
              public formsService: FormsService

  ) { }

  ngOnInit(): void {
    this.btnTitle = 'Save';
    this.initDoctorform();
    this.getCountries();

    if (this.route.snapshot.params.id) {

      this.doctorService
        .getDoctor(this.route.snapshot.params.id)
        .subscribe(resp => {
          this.doctor = resp[0];
          this.setFormData(this.doctor);
          this.btnTitle = 'Edit';
        });

    }

  }

  initDoctorform() {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      notes: ['', [Validators.minLength(10), Validators.maxLength(200)]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],

    });
    this.doctorForm.reset();
  }

  getCountries() {
    this.countryService
      .getCountries().subscribe(
        (resp: any) => {
          this.countries = resp;
        }
      );
  }

  addDoctor(doctor: Person) {
    this.doctorService.AddDoctor(doctor);
    this.router.navigateByUrl('/doctors');
  }

  edit() {
    this.doctor.name = this.doctorForm.get('name').value;
    this.doctor.email = this.doctorForm.get('email').value;
    this.doctor.notes = this.doctorForm.get('notes').value;
    this.doctor.country = this.doctorForm.get('country').value;
    this.doctor.gender = this.doctorForm.get('gender').value;

    this.doctorService.editDoctor(this.doctor)
    .then(res => this.router
      .navigateByUrl('/admin/doctors'));

  }

  save(doctor: Person) {
    if (this.doctorForm.valid) {
      if (this.btnTitle === 'Save') {
        this.doctorService.AddDoctor(doctor)
          .then(res => this.router
            .navigateByUrl('/admin/doctors'));
      } else {
        this.edit();
      }
    }

  }

  setFormData(doctor: Person) {
    this.doctorForm.get('name').setValue(doctor.name);
    this.doctorForm.get('email').setValue(doctor.email);
    this.doctorForm.get('notes').setValue(doctor.notes);
    this.doctorForm.get('country').setValue(doctor.country);
    this.doctorForm.get('gender').setValue(doctor.gender);
  }



}
