/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, Input } from '@angular/core';

import { Block } from '../../interfaces/pg-page';
import { ContentTypeTemplate } from '../../enums/ContentType.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
  @Input() isMobile: boolean;
  @Input() options: Block;

  constructor() {}
}
