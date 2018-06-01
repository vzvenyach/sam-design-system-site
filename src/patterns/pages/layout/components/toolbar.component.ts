import {
    Component,
    ContentChild,
    AfterContentInit,
    HostBinding,
    Input
  } from '@angular/core';
import { SamSidenav2Component } from './sidenav.component';
import { SamAsideComponent } from '..';

@Component({
    selector: 'sam-toolbar',
    template: `
  <div class="sam menu">
    <a (click)="toggleSidenav()">
      <sam-icon name="slider-h"></sam-icon>
      Toggle filters
    </a>

    <div class="section right">
      <a>
        <i class="fa fa-download" aria-hidden="true"></i>
        Download
      </a>
      <a>
        <i class="fa fa-share-alt" aria-hidden="true"></i>
        Share
      </a>
      <a>
        <i class="fa fa-cloud" aria-hidden="true"></i>
        Save Criteria
      </a>
    </div>
  </div>
  `
  })
  export class SamToolbarComponent {
    @Input() sidenav: SamAsideComponent;

    public toggleSidenav () {
      this.sidenav.toggle();
    }
  }
