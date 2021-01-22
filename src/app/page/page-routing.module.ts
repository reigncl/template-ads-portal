import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  },
  {
    path: ':first',
    component: PageComponent,
  },
  {
    path: ':first/:second',
    component: PageComponent,
  },
  {
    path: ':first/:second/:third',
    component: PageComponent,
  },
  {
    path: ':first/:second/:third/:quarter',
    component: PageComponent,
  },
  {
    path: ':first/:second/:third/:quarter/:fifth',
    component: PageComponent,
  },
  {
    path: '**',
    component: PageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
