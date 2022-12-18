import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavBar } from './components/navBar/navBar';
import { RecordWindow } from './components/recordWindow/recordWindow';

const routes: Routes = [
  { path: 'about', component: NavBar }, 
  {
    path: 'individuals',
    component: RecordWindow,
  },
  {
    path: 'staff',
    component: RecordWindow,
  },
  {
    path: 'students',
    component: RecordWindow,
  },
  {
    path: '/courses',
    component: RecordWindow,
  },
  {
    path: '/schools',
    component: RecordWindow,
  },
  {
    path: '/degrees',
    component: RecordWindow,
  },
  {
    path: '/modules',
    component: RecordWindow,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
