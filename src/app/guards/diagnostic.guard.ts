import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DiagnosticComponent } from '../pages/maintenance/diagnostic/diagnostic.component';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticGuard implements CanDeactivate<DiagnosticComponent> {
  canDeactivate(
    component: DiagnosticComponent): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    
    if (component.frmDiagnostic.dirty || component.details.length > 0) {
      return Swal.fire({
        title: ` are you sure you want to leave withou saving?`,
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        return result.isConfirmed ? true : false;
      });

    }

    return true;
  }

}
