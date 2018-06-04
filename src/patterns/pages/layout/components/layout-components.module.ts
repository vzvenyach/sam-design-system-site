import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { MdSidenavModule } from './sidenav';
import { SamAsideModule } from './aside';
import { SamActionBarComponent } from './actionbar.component';
import { SamLayoutComponent } from './layout.component';
import { SamMainComponent } from './main.component';
import { SamDatabankPaginationComponent } from './pagination.component';
import { SamToolbarComponent } from './toolbar.component';
import { SamUIKitModule } from 'sam-ui-elements/src/ui-kit';
import {
  SamFeedbackWrapperComponent
} from './feedback-wrapper.component';
import {
  SamFiltersWrapperComponent
} from './filters-wrapper.component';
import {
  SamResourcesWrapperComponent
} from './resources-wrapper.component';
import {
  SamDatabankTitleSectionDirective
} from './title-section.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SamUIKitModule,
    MdSidenavModule,
    SamAsideModule
  ],
  declarations: [
    SamActionBarComponent,
    SamLayoutComponent,
    SamMainComponent,
    SamDatabankPaginationComponent,
    SamToolbarComponent,
    SamFeedbackWrapperComponent,
    SamFiltersWrapperComponent,
    SamResourcesWrapperComponent,
    SamDatabankTitleSectionDirective
  ],
  exports: [
    MdSidenavModule,
    SamAsideModule,
    SamActionBarComponent,
    SamLayoutComponent,
    SamMainComponent,
    SamDatabankPaginationComponent,
    SamToolbarComponent,
    SamFeedbackWrapperComponent,
    SamFiltersWrapperComponent,
    SamResourcesWrapperComponent,
    SamDatabankTitleSectionDirective
  ]
})
export class SamLayoutComponentsModule {}
