import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { HomeComponent } from './components/home/home.component';
import { CamionesComponent } from './components/camiones/camiones.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'conductores', component: ConductoresComponent},
  {path: 'camiones', component: CamionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
