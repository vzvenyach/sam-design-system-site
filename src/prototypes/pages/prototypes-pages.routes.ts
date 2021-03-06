import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './prototypes-pages.component';
import { SearchPageComponent } from './search/search.component';
import { HomePageComponent } from './homepage/home.component';
import { SearchMobileComponent } from './search-mobile/search.component';
import { ReportPageComponent } from './report/report.component';
import { TablePageComponent } from './table/table.component';
import { DatePageComponent } from './date/date.component';

const PageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'search-mobile',
        component: SearchMobileComponent
      },
      {
        path: 'report',
        component: ReportPageComponent
      },
      {
        path: 'table',
        component: TablePageComponent
      },
      {
        path: 'date',
        component: DatePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
