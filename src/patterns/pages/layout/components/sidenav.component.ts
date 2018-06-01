import { Component, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'sam-sidenav2',
  template: `
    <md-sidenav #sidenav
      [opened]="opened"
      [mode]="mode">
      <ng-content></ng-content>
    </md-sidenav>
  `
})
export class SamSidenav2Component {

  @Input() public opened: any;
  @Input() public mode: string;

}
