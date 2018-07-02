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
    <main [@routerTransition]="getState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </main>

  `,
})
export class AppComponent {
  constructor() {}
  public getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
