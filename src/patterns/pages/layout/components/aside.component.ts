import {
    Component,
    ContentChild,
    AfterContentInit,
    HostBinding,
    ViewChild,
    Input
} from '@angular/core';
import { MdSidenav } from './aside';

@Component({
    selector: 'sam-aside',
    template: `
        <md-sidenav #sidenav
            [mode]="mode">
            <ng-content></ng-content>
        </md-sidenav>
    `
})
export class SamAsideComponent {
    @HostBinding('class.sidebar') container: boolean = true;
    @ViewChild('sidenav') public sidenav: MdSidenav;

    @Input() public opened: boolean = true;
    @Input() public mode: string;

    public toggle () {
        console.log(this.sidenav);
        if (this.sidenav) {
            this.sidenav.toggle();
        }
    }
}
