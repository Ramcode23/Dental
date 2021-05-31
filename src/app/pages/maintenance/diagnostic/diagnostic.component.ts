import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { FormsService } from '../../../services/forms.service';

import { Person } from '../../../models/person.mode';
import { Service, Details } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';
import Swal from 'sweetalert2';
import { Diagnostic } from '../../../models/diagnotic.model';
import { v4 as uuidv4 } from 'uuid';
import { DiagnosticService } from '../../../services/diagnostic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
  showModal: boolean;
  loanding: boolean;
  editflag: boolean;
  patiens: Person[] = [];
  doctors: Person[] = [];
  services: Service[] = [];
  diagnostic: Diagnostic;
  details: Details[] = [];

  btnTitle: string;
  frmDiagnostic: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private diagnosticService: DiagnosticService,
              private doctorService: DoctorService,
              private patientsService: PatientsService,
              private serviceService: ServiceService,
              public formsService: FormsService,

  ) { }

  ngOnInit(): void {
    this.initData();
    this.initform();
    this.editflag = false;
    if (this.route.snapshot.params.id) {

      this.diagnosticService
        .getdiagnostic(this.route.snapshot.params.id)
        .subscribe(resp => {
          this.diagnostic = resp[0];
          this.setFormData(this.diagnostic);
          this.btnTitle = 'Edit';
          this.editflag = true;
        });

    }

  }

  initData() {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
    this.patientsService.getPatients()
      .subscribe(patiens => this.patiens = patiens);
    this.serviceService.getservices()
      .subscribe(services => this.services = services);
  }

  initform() {
    this.frmDiagnostic = this.fb.group({
      date: ['', Validators.required],
      doctor: ['', Validators.required],
      patien: ['', Validators.required]
    });
  }

  addDetails(id: string, quality: number) {
    if (!id) {
      this.errorMessage('You need add a service');
    } else if (!quality) {
      this.errorMessage('You need add a quality');
    } else if (quality <= 0) {
      this.errorMessage('A quantity greater than zero is required');

    } else {
      const service = this.services.filter(s => s.id === id)[0];
      const i = this.details.findIndex(d => d.idservice === id);

      if (i >= 0) {
        this.details[i].quality = Number(quality) + Number(this.details[i].quality);
      } else {

        this.details.push({ id: uuidv4(), idservice: service.id, desc: service.desc, quality });
      }
    }
    console.log(this.details);

  }
  deleteDetail(details: Details) {
    this.details = this.details.filter(s => s.id !== details.id);

  }

  errorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    });
  }

  save(diagnostic: Diagnostic) {

    if (this.editflag === false) {
      const { date, doctor, patien } = diagnostic;
      this.diagnosticService.adddiagnostic(
        {
          date,
          doctor,
          patien,
          details: this.details
        }
      ).then(resp => this.router.navigateByUrl('/admin/diagnostics'));

    } else {
      this.edit();
    }
  }

  edit() {
    this.diagnostic.date = this.frmDiagnostic.get('date').value;
    this.diagnostic.doctor = this.frmDiagnostic.get('doctor').value;
    this.diagnostic.patien = this.frmDiagnostic.get('patien').value;
    this.diagnostic.details = this.details;
    this.diagnosticService.editdiagnostic(this.diagnostic)
      .then(resp => this.router.navigateByUrl('/admin/diagnostics'));
  }

  setFormData(diagnostic: Diagnostic) {
    this.frmDiagnostic.get('date').setValue(diagnostic.date);
    this.frmDiagnostic.get('doctor').setValue(diagnostic.doctor);
    this.frmDiagnostic.get('patien').setValue(diagnostic.patien);
    this.details = diagnostic.details;
  }

}
