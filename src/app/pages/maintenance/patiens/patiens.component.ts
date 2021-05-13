import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.mode';
import { PatiensService } from '../../../services/patiens.service';

@Component({
  selector: 'app-patiens',
  templateUrl: './patiens.component.html',
  styleUrls: ['./patiens.component.css']
})
export class PatiensComponent implements OnInit {
  patiens: Person[] = [];
  loanding: boolean;
  pageSize = 5;
  page = 1;

  constructor(private parienService: PatiensService, private router: Router) {
    this.loanding = true;
  }

  ngOnInit(): void {
    this.getAllPatiens();
  }

  getAllPatiens() {
    this.parienService.getPatiens()
      .subscribe((data: any) => {
        this.patiens = data;
        this.loanding = false;
      }

      );
  }

  selectoEdit(patien: Person) {
    this.router.navigateByUrl(`admin/patien/${patien.id}`);
  }


  search(field: string) {

    if (field) {
      this.parienService.searchPatien(field)
        .subscribe(patiens => {
          this.patiens = patiens;
        });

    } else {
      this.getAllPatiens();
    }
    this.loanding = false;


  }
}
