
/* tslint:disable */
/******************************************************/
/* File generated in ../config/helpers.js             */
/******************************************************/
// Angular Dependencies
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BaseExampleComponent } from './baseexample.component';

import { AccordionExampleComponent } from './components/accordion/component-example';
import { SamActionButtonExampleComponent } from './components/actions/action-button/component-example';
import { SamActionsDropdownComponentExampleComponent } from './components/actions/actions-dropdown/component-example';
import { AlertExampleComponent } from './components/alert/component-example';
import { SamAlertFooterComponentExampleComponent } from './components/alert-footer/component-example';
import { SamBadgeComponentExampleComponent } from './components/badge/component-example';
import { SamBreadcrumbsComponentExampleComponent } from './components/breadcrumbs/component-example';
import { SamCommentsComponentExampleComponent } from './components/comments/component-example';
import { DownloadExampleComponent } from './components/download/component-example';
import { HistoryExampleComponent } from './components/history/component-example';
import { SamImageComponentExampleComponent } from './components/image/component-example';
import { LabelExampleComponent } from './components/label/component-example';
import { ModalExampleComponent } from './components/modal/component-example';
import { MultiselectDropdownExampleComponent } from './components/multiselect-dropdown/component-example';
import { PaginationExampleComponent } from './components/pagination/component-example';
import { POCExampleComponent } from './components/point-of-contact/component-example';
import { SamProgressExampleComponent } from './components/progress-bar/component-example';
import { SidenavExampleComponent } from './components/sidenav/component-example';
import { SpinnerExampleComponent } from './components/spinner/component-example';
import { TabsExampleComponent } from './components/tabs/component-example';
import { SamUploadComponentExampleComponent } from './components/upload/component-example';
import { ClickOutsideExampleComponent } from './directives/click-outside/component-example';
import { SamDragDropDirectiveExampleComponent } from './directives/drag-drop/component-example';
import { SamExternalLinkDirectiveExampleComponent } from './directives/external-link/component-example';
import { SamFocusDirectiveExampleComponent } from './directives/focus/component-example';
import { StickyExampleComponent } from './directives/sticky/component-example';
import { TabOutsideExampleComponent } from './directives/tab-outside/component-example';
import { ButtonExampleComponent } from './elements/button/component-example';
import { SamBoxComponentExampleComponent } from './experimental/box/component-example';
import { SamContainerComponentExampleComponent } from './experimental/container/component-example';
import { SamDataTableComponentExampleComponent } from './experimental/data-table/component-example';
import { SamDollarComponentExampleComponent } from './experimental/dollar/component-example';
import { SamFilterDrawerComponentExampleComponent } from './experimental/filter-drawer/component-example';
import { SamHeadingComponentExampleComponent } from './experimental/heading/component-example';
import { SamIconComponentExampleComponent } from './experimental/icon/component-example';
import { SamInputMaskComponentExampleComponent } from './experimental/input-mask/component-example';
import { SamLabelNextComponentExampleComponent } from './experimental/label/component-example';
import { SamListComponentExampleComponent } from './experimental/list/component-example';
import { SamMasterPageComponentExampleComponent } from './experimental/master-page/component-example';
import { SamPageComponentExampleComponent } from './experimental/page/component-example';
import { SamPageTitleExampleComponent } from './experimental/page-title/component-example';
import { SamSearchComponentExampleComponent } from './experimental/search/component-example';
import { SamSidebarComponentExampleComponent } from './experimental/sidebar/component-example';
import { SamTitleComponentExampleComponent } from './experimental/title/component-example';
import { SamVideoPlayerComponentExampleComponent } from './experimental/video-player/component-example';
import { SamYoutubeComponentExampleComponent } from './experimental/youtube/component-example';
import { AutocompleteExampleComponent } from './form-controls/autocomplete/component-example';
import { AutocompleteMultiselectExampleComponent } from './form-controls/autocomplete-multiselect/component-example';
import { CheckboxExampleComponent } from './form-controls/checkbox/component-example';
import { DateExampleComponent } from './form-controls/date/component-example';
import { SamDateRangeComponentExampleComponent } from './form-controls/date-range/component-example';
import { DateTimeExampleComponent } from './form-controls/date-time/component-example';
import { NumberExampleComponent } from './form-controls/number/component-example';
import { RadioExampleComponent } from './form-controls/radiobutton/component-example';
import { SelectExampleComponent } from './form-controls/select/component-example';
import { TextExampleComponent } from './form-controls/text/component-example';
import { TextareaExampleComponent } from './form-controls/textarea/component-example';
import { TimeExampleComponent } from './form-controls/time/component-example';
import { ToggleSwitchExampleComponent } from './form-controls/toggle-switch/component-example';
import { PhoneGroupExampleComponent } from './form-templates/international-phone/component-example';
import { NameEntryExampleComponent } from './form-templates/name-entry/component-example';
import { PhoneEntryExampleComponent } from './form-templates/phone-entry/component-example';
import { FieldsetWrapperExampleComponent } from './wrappers/fieldset-wrapper/component-example';
import { LabelWrapperExampleComponent } from './wrappers/label-wrapper/component-example';


import { DocTemplateComponent } from './doc.template';
import { routing } from './doc.routes.dynamic';
import { StaticPageComponent } from './static.component';
import { SamUIKitModule } from '@gsa-sam/sam-ui-elements/src/ui-kit';
import { InterfacesComponent } from './data-structures/interfaces/interfaces.component';
import { SiteComponentsModule } from '../app/site-components/sitecomponents.module';
import { CdkTableModule } from '@angular/cdk';

/**
 * AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    AccordionExampleComponent,
    SamActionButtonExampleComponent,
    SamActionsDropdownComponentExampleComponent,
    AlertExampleComponent,
    SamAlertFooterComponentExampleComponent,
    SamBadgeComponentExampleComponent,
    SamBreadcrumbsComponentExampleComponent,
    SamCommentsComponentExampleComponent,
    DownloadExampleComponent,
    HistoryExampleComponent,
    SamImageComponentExampleComponent,
    LabelExampleComponent,
    ModalExampleComponent,
    MultiselectDropdownExampleComponent,
    PaginationExampleComponent,
    POCExampleComponent,
    SamProgressExampleComponent,
    SidenavExampleComponent,
    SpinnerExampleComponent,
    TabsExampleComponent,
    SamUploadComponentExampleComponent,
    ClickOutsideExampleComponent,
    SamDragDropDirectiveExampleComponent,
    SamExternalLinkDirectiveExampleComponent,
    SamFocusDirectiveExampleComponent,
    StickyExampleComponent,
    TabOutsideExampleComponent,
    ButtonExampleComponent,
    SamBoxComponentExampleComponent,
    SamContainerComponentExampleComponent,
    SamDataTableComponentExampleComponent,
    SamDollarComponentExampleComponent,
    SamFilterDrawerComponentExampleComponent,
    SamHeadingComponentExampleComponent,
    SamIconComponentExampleComponent,
    SamInputMaskComponentExampleComponent,
    SamLabelNextComponentExampleComponent,
    SamListComponentExampleComponent,
    SamMasterPageComponentExampleComponent,
    SamPageComponentExampleComponent,
    SamPageTitleExampleComponent,
    SamSearchComponentExampleComponent,
    SamSidebarComponentExampleComponent,
    SamTitleComponentExampleComponent,
    SamVideoPlayerComponentExampleComponent,
    SamYoutubeComponentExampleComponent,
    AutocompleteExampleComponent,
    AutocompleteMultiselectExampleComponent,
    CheckboxExampleComponent,
    DateExampleComponent,
    SamDateRangeComponentExampleComponent,
    DateTimeExampleComponent,
    NumberExampleComponent,
    RadioExampleComponent,
    SelectExampleComponent,
    TextExampleComponent,
    TextareaExampleComponent,
    TimeExampleComponent,
    ToggleSwitchExampleComponent,
    PhoneGroupExampleComponent,
    NameEntryExampleComponent,
    PhoneEntryExampleComponent,
    FieldsetWrapperExampleComponent,
    LabelWrapperExampleComponent,
    InterfacesComponent,
    DocTemplateComponent,
    StaticPageComponent,
    BaseExampleComponent
  ],
  entryComponents: [
    AccordionExampleComponent,
    SamActionButtonExampleComponent,
    SamActionsDropdownComponentExampleComponent,
    AlertExampleComponent,
    SamAlertFooterComponentExampleComponent,
    SamBadgeComponentExampleComponent,
    SamBreadcrumbsComponentExampleComponent,
    SamCommentsComponentExampleComponent,
    DownloadExampleComponent,
    HistoryExampleComponent,
    SamImageComponentExampleComponent,
    LabelExampleComponent,
    ModalExampleComponent,
    MultiselectDropdownExampleComponent,
    PaginationExampleComponent,
    POCExampleComponent,
    SamProgressExampleComponent,
    SidenavExampleComponent,
    SpinnerExampleComponent,
    TabsExampleComponent,
    SamUploadComponentExampleComponent,
    ClickOutsideExampleComponent,
    SamDragDropDirectiveExampleComponent,
    SamExternalLinkDirectiveExampleComponent,
    SamFocusDirectiveExampleComponent,
    StickyExampleComponent,
    TabOutsideExampleComponent,
    ButtonExampleComponent,
    SamBoxComponentExampleComponent,
    SamContainerComponentExampleComponent,
    SamDataTableComponentExampleComponent,
    SamDollarComponentExampleComponent,
    SamFilterDrawerComponentExampleComponent,
    SamHeadingComponentExampleComponent,
    SamIconComponentExampleComponent,
    SamInputMaskComponentExampleComponent,
    SamLabelNextComponentExampleComponent,
    SamListComponentExampleComponent,
    SamMasterPageComponentExampleComponent,
    SamPageComponentExampleComponent,
    SamPageTitleExampleComponent,
    SamSearchComponentExampleComponent,
    SamSidebarComponentExampleComponent,
    SamTitleComponentExampleComponent,
    SamVideoPlayerComponentExampleComponent,
    SamYoutubeComponentExampleComponent,
    AutocompleteExampleComponent,
    AutocompleteMultiselectExampleComponent,
    CheckboxExampleComponent,
    DateExampleComponent,
    SamDateRangeComponentExampleComponent,
    DateTimeExampleComponent,
    NumberExampleComponent,
    RadioExampleComponent,
    SelectExampleComponent,
    TextExampleComponent,
    TextareaExampleComponent,
    TimeExampleComponent,
    ToggleSwitchExampleComponent,
    PhoneGroupExampleComponent,
    NameEntryExampleComponent,
    PhoneEntryExampleComponent,
    FieldsetWrapperExampleComponent,
    LabelWrapperExampleComponent,
    InterfacesComponent,
    DocTemplateComponent,
    StaticPageComponent,
    BaseExampleComponent
  ],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
    SamUIKitModule,
    routing,
		SiteComponentsModule,
		CdkTableModule
  ],
  exports: [BaseExampleComponent]
})
export class DocModule { }
