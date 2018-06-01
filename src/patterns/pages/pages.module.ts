import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SamUIKitModule } from 'sam-ui-elements/src/ui-kit';
import { PagesRoutingModule } from './pages.routes';

import { PagesComponent } from './pages.component';
import { PageAComponent } from './page-a/page.component';
import { PageBComponent } from './page-b/page.component';
import { SamLayoutDemoComponent, SamActionBarComponent,
  SamAsideComponent, SamMainComponent, SamLayoutComponent,
  SamToolbarComponent } from './layout';
import { MdSidenavModule } from './layout/components/aside';
import { SamSidenav2Component } from './layout/components/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    SamUIKitModule,
    MdSidenavModule
  ],
  declarations: [
    PagesComponent,
    PageAComponent,
    PageBComponent,
    SamLayoutDemoComponent,
    SamLayoutComponent,
    SamActionBarComponent,
    SamAsideComponent,
    SamMainComponent,
    SamToolbarComponent,
    SamSidenav2Component
  ]
})
export class PagesModule {}
