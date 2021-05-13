import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log/log.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';




@NgModule({
  declarations:
    [LogComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule
  ]
  , exports: [
    LogComponent
  ],

})
export class AuhtModule { }
