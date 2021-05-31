import { Component, Input, OnInit } from '@angular/core';
import { Apoinment } from '../../models/apoinment.model';
import { ScheduleService } from '../../services/schedule.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  showModal: boolean;
  apoiments: Apoinment[] = [];
  classbutton: string;
  stylepanel: boolean;
  editflag: boolean;
  loanding: boolean;
  pageSize = 4;
  page = 1;
  constructor(private scheduleService: ScheduleService,

  ) { }

  ngOnInit(): void {
    this.showModal = false;
    this.getApointments();
    this.classbutton = 'fa fa-arrow-up';
    this.stylepanel = true;
    this.loanding = true;
  }

  doneApoiment(index: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.scheduleService.deleteApoinments(this.apoiments[index])
          .then(resp => {
            Swal.fire(
              'Done!',
              'Your event has been deleted.',
              'success'
            );
          });
      }
    })

  }

  getApointments() {
    this.loanding = true;
    this.scheduleService.getApoinments()
      .subscribe(resp => {
        this.apoiments = resp;
        this.loanding = false;
      });
  }


  hidepanel() {

    if (this.classbutton === 'fa fa-arrow-up') {
      this.classbutton = 'fa fa-arrow-down';
    } else {
      this.classbutton = 'fa fa-arrow-up';
    }

    this.stylepanel = !this.stylepanel;
  }


}
