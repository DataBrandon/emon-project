import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartmeterDetailComponent }  from './smartmeter-detail/smartmeter-detail.component';
import { MoistmeterDetailComponent }  from './moistmeter-detail/moistmeter-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'smartmeter', component: SmartmeterDetailComponent },
  { path: 'moistmeter', component: MoistmeterDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
