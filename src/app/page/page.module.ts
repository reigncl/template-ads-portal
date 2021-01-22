import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { TemplatesComponent } from './templates/templates.component';

import { AtomsModule, MoleculesModule, OrganismsModule, TemplatesModule } from 'atomic';

@NgModule({
  declarations: [PageComponent, TemplatesComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    TemplatesModule,
  ],
  providers: [],
})
export class PageModule {}
