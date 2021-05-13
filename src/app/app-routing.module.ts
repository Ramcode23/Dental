import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PagesRoutingModule } from './pages/page.routing';
import { AuthroutingModule } from './auth/auth.routing';
import { NotfoundComponent } from './shared/notfound/notfound.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin' },
  { path: '**', component: NotfoundComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule, AuthroutingModule,

  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
