import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { TemplatesComponent } from './templates/templates.component';

import { AtomsModule, MoleculesModule } from 'atomic';

@NgModule({
  declarations: [PageComponent, TemplatesComponent],
  imports: [CommonModule, PageRoutingModule, AtomsModule, MoleculesModule],
  providers: [],
})
export class PageModule {}
