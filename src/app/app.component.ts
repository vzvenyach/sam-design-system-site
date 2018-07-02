/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { routerTransition } from './router.animations';

import { environment } from 'environment';
const DOCS = environment.DOCS;
const STATICPAGES = environment.STATICPAGES;

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'sam-app',
  animations: [ routerTransition ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>HELLOOOOO!!!</div>
  `,
})
export class AppComponent {


  constructor() {}
}
