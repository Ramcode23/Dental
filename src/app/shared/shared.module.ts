import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { NodataComponent } from './nodata/nodata.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations:
    [
      NavbarComponent,
      SidebarComponent,
      LoaderComponent,
      NodataComponent,
      FooterComponent,
      NotfoundComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    NodataComponent,
    FooterComponent,

  ]
})
export class SharedModule { }
