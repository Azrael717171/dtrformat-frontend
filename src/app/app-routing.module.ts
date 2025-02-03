import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DtrformatComponent } from './components/dtrformat/dtrformat.component';

const routes: Routes = [
  {
    path: '',
    component: DtrformatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
