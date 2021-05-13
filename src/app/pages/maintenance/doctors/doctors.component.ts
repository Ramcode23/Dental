import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { DoctorService } from '../../../services/doctor.service';
import { Person } from '../../../models/person.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Person[] = [];
  loanding: boolean;
  pageSize = 5;
  page = 1;
  constructor(private doctorService: DoctorService, private router: Router) {
    this.loanding = true;
  }
  ngOnInit(): void {
    this.getAllDoctors();

  }


  getAllDoctors() {
    this.doctorService.getDoctors()
      .subscribe((data: any) => {
        this.doctors = data;
        this.loanding = false;
      }

      );



  }

  search(field: string) {

    if (field) {
      this.doctorService.searchDoctor(field)
        .subscribe(doctors => {
          this.doctors = doctors;
        });

    } else {
      this.getAllDoctors();
    }
    this.loanding = false;


  }



  selectoEdit(doctor: Person) {
    this.router.navigateByUrl(`doctor/${doctor.id}`);
  }

}
