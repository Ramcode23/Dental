import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './maintenance/admin/admin.component';
import { ApointmentComponent } from './schedule/apointment/apointment.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DiagnosticComponent } from './maintenance/diagnostic/diagnostic.component';
import { DiagnosticsComponent } from './maintenance/diagnostics/diagnostics.component';

import { ServiceComponent } from './maintenance/services/service.component';
import { ServicesComponent } from './maintenance/services/services.component';
import { PagesComponent } from './pages.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SharedModule } from '../shared/shared.module';
import { DiagnosticGuard } from '../guards/diagnostic.guard';
import { PatientsComponent } from './maintenance/patients/patients.component';
import { PatientComponent } from './maintenance/patients/patient.component';



@NgModule({
  declarations: [
    AdminComponent,
    ApointmentComponent,
    ScheduleComponent,
    DoctorsComponent,
    DoctorComponent,
    ServicesComponent,
    ServiceComponent,
    PatientComponent,
    PatientsComponent,
    PagesComponent,
    DiagnosticComponent,
    DiagnosticsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    SharedModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [DiagnosticGuard],
  exports: [
    AdminComponent,
    PagesComponent,
  ],

})
export class PagesModule { }
