// Angular Dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StaticPageComponent } from "./staticpage.component";

import { routing } from "./staticdoc.routes";

import { SamUIKitModule } from '../../sam-ui-elements/src/ui-kit';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    StaticPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SamUIKitModule,
    routing
  ],
  exports: [
  ]
})
export class StaticDocModule { }