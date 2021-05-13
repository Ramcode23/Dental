import { EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/services/forms.service';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnChanges {
  public serviceForm: FormGroup;
  @Input() showModal = false;
  @Input() service: Service;
  @Output() newService = new EventEmitter<Service>();
  @Input() btnTitle: string;
  constructor(private fb: FormBuilder,
    public formsService: FormsService,
    private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.initServiceform();
    this.showModal = false;
    if (this.btnTitle === 'Edit') {
      this.serviceForm.get('desc').setValue(this.service.desc);
    } else {
      this.resetComponent();
    }
  }

  ngOnChanges(): void {
    if (this.btnTitle === 'Edit') {
      this.serviceForm.get('desc').setValue(this.service.desc);
      console.log(this.service);
    } else {
      this.resetComponent();
    }

  }


  initServiceform() {
    this.serviceForm = this.fb.group({
      desc: ['', [Validators.required,
      Validators.maxLength(200)]],
    });

  }

  save(service: Service) {

    if (this.serviceForm.valid) {

      if (this.btnTitle === 'Save') {
        this.serviceService
          .addService(service)
          .then(resp => {

            this.resetComponent();
            this.showModal = false;
          });
      } else {
        this.service.desc = service.desc;
        this.serviceService
          .editService(this.service).then(resp => {
            this.resetComponent();
            this.showModal = false;
          });

      }
    } /*
        this.newService.emit(service); */
  }

  resetComponent() {
    this.btnTitle = 'Save';
    if (this.serviceForm) {

      this.serviceForm.reset();
    }
    this.service = null;

  }

}
