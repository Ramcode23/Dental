import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person.mode';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientsService } from 'src/app/services/patients.service';

import { Apoinment } from '../../../models/apoinment.model';
import { FormsService } from '../../../services/forms.service';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-apointment',
  templateUrl: './apointment.component.html',
  styleUrls: ['./apointment.component.css']
})
export class ApointmentComponent implements OnInit {
  @Input() showModal = false;

  @Output() newApoimentEvent = new EventEmitter<Apoinment>();
  show: boolean;
  errors: string[] = [];
  formApoiment: FormGroup;

  doctors: Person[] = [];
  patiens: Person[] = [];
  apoinment: Apoinment;


  constructor(private fb: FormBuilder,
              private doctorService: DoctorService,
              private patientsService: PatientsService,
              public formsService: FormsService,
              private scheduleService: ScheduleService,
  ) {

  }

  ngOnInit(): void {

    this.initData();
    this.initForm();
  }


  initData() {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
    this.patientsService.getPatients()
      .subscribe(patiens => this.patiens = patiens);
  }

  initForm() {
    this.errors = [];
    this.showModal = false;
    this.formApoiment = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      patien: ['', Validators.required],
      doctor: ['', Validators.required],
      coment: [''],

    });

  }



  addApoiment(apoinment: Apoinment) {
    if (this.formApoiment.valid) {
      this.scheduleService.addapoinment(apoinment);
    }

  }


  edit() {
    this.apoinment.title = this.formApoiment.get('title').value;
    this.apoinment.date = this.formApoiment.get('date').value;
    this.apoinment.patien = this.formApoiment.get('patien').value;
    this.apoinment.doctor = this.formApoiment.get('doctor').value;
    this.apoinment.coment = this.formApoiment.get('coment').value;
    this.scheduleService.editApoinments(this.apoinment);

  }









}


