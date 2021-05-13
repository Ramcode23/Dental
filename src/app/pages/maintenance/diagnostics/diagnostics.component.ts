import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diagnostic } from '../../../models/diagnotic.model';
import { DiagnosticService } from '../../../services/diagnostic.service';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css']
})
export class DiagnosticsComponent implements OnInit {
  diagnostics: Diagnostic[] = [];
  loanding: boolean;
  pageSize = 5;
  page = 1;
  constructor(private diagnosticService: DiagnosticService, private router: Router) {
    this.loanding = true;
  }
  ngOnInit(): void {
    this.getAllDiagnostics();

  }


  getAllDiagnostics() {
    this.diagnosticService.getdiagnostics()
      .subscribe((data: any) => {
        this.diagnostics = data;
        this.loanding = false;
      }

      );



  }

  search(field: string) {

    if (field) {
      this.diagnosticService.searchdiagnostic(field)
        .subscribe(diagnostics => {
          this.diagnostics = diagnostics;
        });

    } else {
      this.getAllDiagnostics();
    }
    this.loanding = false;


  }



  selectoEdit(diagnostics: Diagnostic) {
    this.router.navigateByUrl(`diagnostic/${diagnostics.id}`);
  }

}
