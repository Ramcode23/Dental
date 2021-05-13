import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogComponent } from '../auth/log/log.component';


const routes: Routes = [
    { path: '', component: LogComponent },
    { path: 'login', component: LogComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthroutingModule {}
