
import {
  Component,
  OnInit,
  Input,
  ComponentRef,
  ViewChild,
  ViewRef,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { BaseExampleComponent } from '../../baseexample.component';

import { Http } from '@angular/http';
import { MarkdownService } from '../../../app/services/markdown/markdown.service';
import { DocumentationService } from '../../../app/services/documentation.service';

// tabs/spacing matters for code example block
const code_example = `
  <p>
    <a rel="noopener noreferrer" target="_blank" [routerLink]="'beta.sam.gov'">Sam.gov</a>
  </p>
  <p>
    <a rel="noopener noreferrer" target="_blank" [hideIcon]="true" [routerLink]="'beta.sam.gov'">Sam.gov</a>
  </p>
`;

@Component({
  selector: 'doc-a',
  template: '<doc-template [markdown]="markdown" [example]="example" [typedoc]="typedoc_content">' + code_example + '</doc-template>'
})
export class SamExternalLinkDirectiveExampleComponent extends BaseExampleComponent implements OnInit {
  typedoc_target = 'SamExternalLinkDirective';
  typedoc_content = '';

  example = code_example;

  public base = '_docs/directives/external-link/';

  constructor(
    _http: Http,
    public service: DocumentationService,
    public mdService: MarkdownService) {

    super(_http, service, mdService);

    this.sections.forEach(this.fetchSection.bind(this));
  }
}

