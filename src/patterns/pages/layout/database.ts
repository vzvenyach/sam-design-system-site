import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SampleData } from './datasource';
import { SamSortDirective } from 'sam-ui-elements/src/ui-kit/experimental/data-table/sort.directive';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { SamModalComponent } from 'sam-ui-elements/src/ui-kit/components/modal';
import { FormControl, NgModel } from '@angular/forms';
import { SamDatabankPaginationComponent } from '.';

export interface SampleDataDef {
  'Agency': string;
  'CFDA Number': number;
  'Title': string | number;
  'Current Status': string;
  'Last Updated Date': string;
  'Obligations Updated': string;
  'OMB Review Date': string;
  'Last Published Date': string;
  'Auto Published': string;
}
  
export class ReportDatabase {
  dataChange: BehaviorSubject<SampleDataDef[]> = new BehaviorSubject<SampleDataDef[]>([]);
  get data(): SampleDataDef[] { return this.dataChange.value; }
  constructor() {
    for (let i = 0; i < 1940; i++) { this.addProgram(); }
  }
  addProgram() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewProgram());
    this.dataChange.next(copiedData);
  }
  private createNewProgram() {
    return SampleData[this.data.length];
  }
}
  
export class SampleDataSource extends DataSource<any> {
  
  constructor(private _sampleDatabase: ReportDatabase,
              private _paginator: SamDatabankPaginationComponent,
              private _sort: SamSortDirective,
              private _fhFilter: FormControl,
              private _dateFilter: FormControl
            ) {
    super();
  }
  connect(): Observable<SampleDataDef[]> {
    const displayDataChanges = [
      this._paginator.pageChange,
      this._sort.samSortChange,
      this._sampleDatabase.dataChange,
      this._fhFilter.valueChanges.map(()=>{
        this._paginator.currentPage = 1;
      }),
      this._dateFilter.valueChanges.map(()=>{
        this._paginator.currentPage = 1;
      })
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      let data = this.getSortedData();
      
      // fh filter
      if (this._fhFilter.value) {
        data = data.filter((row) => {
          if (row.Agency.toLowerCase().includes(this._fhFilter.value.toLowerCase())) {
            return true;
          }
        });
      }

      // date filter
      if (this._dateFilter.value && this._dateFilter.value !== 'Invalid Date') {
        const dateB = new Date(this._dateFilter.value);
        data = data.filter((row) => {
          const dateA = new Date(row['Last Updated Date']);
          if (dateA.getDate() === (dateB.getDate()+1) &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getFullYear() === dateB.getFullYear()) {
            return true;
          }
        });
      }

      // pagination
      const startIndex = (this._paginator.currentPage - 1) * this._paginator.pageSize;
      this._paginator.totalPages = Math.ceil(data.length / 10);
      data = data.splice(startIndex, this._paginator.pageSize);
      return data;
    });
  }
  disconnect() {}

  getSortedData(): SampleDataDef[] {
    const data = this._sampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'Agency': [propertyA, propertyB] = [a['Agency'], b['Agency']]; break;
        case 'CFDANumber': [propertyA, propertyB] = [a['CFDA Number'], b['CFDA Number']]; break;
        case 'Title': [propertyA, propertyB] = [a['Title'], b['Title']]; break;
        case 'CurrentStatus': [propertyA, propertyB] = [a['Current Status'], b['Current Status']]; break;
        case 'LastUpdatedDate':
          [propertyA, propertyB] = [
            new Date(a['Last Updated Date']).getTime(),
            new Date(b['Last Updated Date']).getTime()];
          break;
        case 'ObligationsUpdated': [propertyA, propertyB] = [a['Obligations Updated'], b['Obligations Updated']]; break;
        case 'OMBReviewDate':
          [propertyA, propertyB] = [
            new Date(a['OMB Review Date']).getTime(),
            new Date(b['OMB Review Date']).getTime()];
          break;
        case 'LastPublishedDate':
          [propertyA, propertyB] = [
            new Date(a['Last Published Date']).getTime(),
            new Date(b['Last Published Date']).getTime()];
          break;
        case 'AutoPublished': [propertyA, propertyB] = [a['Auto Published'], b['Auto Published']]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}