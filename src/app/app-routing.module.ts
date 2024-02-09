import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationComponent } from './validation/validation.component'; // Import your ValidationComponent

const routes: Routes = [
  { path: 'validation', component: ValidationComponent } // Define a route for your ValidationComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
