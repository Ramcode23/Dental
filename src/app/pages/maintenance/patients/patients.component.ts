import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.mode';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Person[] = [];
  loanding: boolean;
  pageSize = 5;
  page = 1;

  constructor(private patientsService: PatientsService, private router: Router) {
    this.loanding = true;
  }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientsService.getPatients()
      .subscribe((data: any) => {
        this.patients = data;
        this.loanding = false;
      }

      );
  }

  selectoEdit(patien: Person) {
    this.router.navigateByUrl(`admin/patien/${patien.id}`);
  }


  search(field: string) {

    if (field) {
      this.patientsService.searchPatient(field)
        .subscribe(patients => {
          this.patients = patients;
        });

    } else {
      this.getAllPatients();
    }
    this.loanding = false;


  }
}
