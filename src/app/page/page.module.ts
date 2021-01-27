import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { TemplatesComponent } from './templates/templates.component';

import { AtomsModule } from 'atomic';

@NgModule({
  declarations: [PageComponent, TemplatesComponent],
  imports: [CommonModule, PageRoutingModule, AtomsModule],
  providers: [],
})
export class PageModule {}
