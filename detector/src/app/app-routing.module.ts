import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteDetectorComponent } from './components/site-detector/site-detector.component';

const routes: Routes = [
  {
    path: '',
    component: SiteDetectorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
