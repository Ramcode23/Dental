import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';
import { FormsService } from '../../../services/forms.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  /* public serviceForm: FormGroup; */
  showModal: boolean;
  loanding: boolean;
  service: Service;
  services: Service[] = [];
  edit: boolean;
  btnTitle: string;
  pageSize = 3;
  page = 1;

  constructor(private serviceService: ServiceService) {

    this.loanding = true;

  }



  ngOnInit(): void {
    this.showModal = false;

    this.resetComponent();
  }

  onScroll() {
    console.log('scrolled!!');
  }


  show() {
    this.showModal = true;
    this.btnTitle = 'Save';
    this.service = null;
    console.log(this.showModal);

  }


  getServices() {
    this.serviceService.getservices()
      .subscribe(services => this.services = services);
    this.loanding = false;
  }

  search(field: string) {

    if (field) {
      this.serviceService.searchService(field)
        .subscribe(services => {
          this.services = services;
        });

    } else {
      this.getServices();
    }
    this.loanding = false;


  }



  selectEdit(service: Service) {


    this.edit = true;
    this.btnTitle = 'Edit';
    this.showModal = true;
    this.service = service;

  }

  resetComponent() {
    this.btnTitle = 'Save';
    this.edit = false;
  
    this.getServices();

  }
}
