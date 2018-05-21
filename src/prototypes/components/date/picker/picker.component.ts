/* tslint:disable */
import {
  animate, Component, ViewChild, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, Renderer, SimpleChange, state, style, transition, trigger, forwardRef
} from '@angular/core';
import { FormControl, Validators, ControlValueAccessor,
  AbstractControl, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';

import { Calendar } from './calendar';
import * as moment from 'moment';

interface DateFormatFunction {
  (date: Date): string;
}

interface ValidationResult {
  [key: string]: boolean;
}
  
@Component({
  selector: 'material-datepicker',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  styles: [
    `.datepicker {
        max-width: 520px;
        position: relative;
        display: block;
        color: #2b2b2b;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto';
      }
      .datepicker__calendar {
        position: absolute;
        overflow: hidden;
        z-index: 1000;
        top: 49px;
        right: 0;
        height: 23.8em;
        width: 20.5em;
        font-size: 14px;
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        cursor: default;
        -webkit-touch-callout: none;
          -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
      }
      .datepicker__calendar__cancel {
        position: absolute;
        bottom: 1em;
        left: 1.8em;
        color: #000;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      .datepicker__calendar__cancel:hover {
        color: #b1b1b1;
      }
      .datepicker__calendar__content {
        margin-top: 0.4em;
      }
      .datepicker__calendar__labels {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
          justify-content: center;
        width: 100%;
      }
      .datepicker__calendar__label {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em;
        line-height: 2.2em;
        text-align: center;
        color: #d8d8d8;
      }
      .datepicker__calendar__month {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: wrap;
            flex-flow: wrap;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
          justify-content: center;
      }
      .datepicker__calendar__month__day {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em 0.4em;
        border-radius: 2.2em;
        line-height: 2.2em;
        text-align: center;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      .datepicker__calendar__nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
          justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
              align-items: center;
        height: 3em;
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
      }
      .datepicker__calendar__nav__arrow {
        width: 0.8em;
        height: 0.8em;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      .datepicker__calendar__nav__arrow:hover {
        -webkit-transform: scale(1.05);
                transform: scale(1.05);
      }
      .datepicker__calendar__nav__chevron {
        fill: #bbbbbb;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      .datepicker__calendar__nav__chevron:hover {
        fill: #2b2b2b;
      }
      .datepicker__calendar__nav__header {
        width: 11em;
        margin: 0 1em;
        text-align: center;
      }
      .datepicker__calendar__nav__header__form {
        display: inline-block;
        margin: 0;
      }
      .datepicker__calendar__nav__header__year {
        display: inline-block;
        width: 3em;
        padding: 2px 4px;
        border: 1px solid #ffffff;
        border-radius: 2px;
        font-size: 1em;
        transition: 0.32s;
      }
      .datepicker__calendar__nav__header__year:focus.ng-invalid {
        border: 1px solid #e82525;
      }
      .datepicker__calendar__nav__header__year:focus.ng-valid {
        border: 1px solid #13ad13;
      }
      .datepicker__calendar__nav__header__year:focus {
        outline: none;
      }
      .datepicker__input {
        outline: none;
        border-radius: 0.1rem;
        padding: .2em .6em;
        font-size: 14px;
      }

      .datepicker-input-wrapper{
        position: relative;
        max-width: 460px;
      }
      .datepicker-input-wrapper input {
        margin: 0;
      }
      .datepicker-input-wrapper span{
        position: absolute;
        right: 15px;
        top: 15px
      }
    `
  ],
  template: `
  <sam-label-wrapper
    #wrapper
    [label]='label'
    [hint]="hint"
    [name]="name">
    <div class="datepicker">
      <div class="datepicker-input-wrapper">
        <sam-input-mask
          [disabled]="disabled"
          [attr.id]="name"
          [template]="'__/__/____'"
          [maxlength]="10"
          [placeholder]="placeholder"
          [disableFocusBehavior]="true"
          [(ngModel)]="inputText"
          (ngModelChange)="syncInputWithCal()">
        </sam-input-mask>
        <span class="fa fa-calendar" 
          #calendarButton
          (click)="onInputClick()"
          (keyup.enter)="onInputClick()"
          role="button"
          [attr.aria-expanded]="showCalendar ? 'true' : 'false'"
          tabindex="0">
          <span class="sr-only">Calendar</span>  
        </span>
      </div>
      <div
        role="dialog"
        aria-label="Calendar"
        class="datepicker__calendar"
        *ngIf="showCalendar"
        #calendarpopup
        id="sam-date-calendar-popup">
        <div class="datepicker__calendar__nav" role="application">
          <div tabindex="0"
            role="button"
            aria-label="Previous Year"
            class="datepicker__calendar__nav__arrow"
            (click)="onArrowClick('left')" (keyup.enter)="onArrowClick('left')">
          <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
            <g>
              <path d="M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3
                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0
                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z"/>
            </g>
            <g>
              <path d="M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3
                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7
                    L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z"/>
            </g>
          </svg>
          </div>
          <div class="datepicker__calendar__nav__header" role="presentation">
            <span>{{ currentMonth }}</span>
            <input
              #yearInput
              class="datepicker__calendar__nav__header__year"
              placeholder="Year"
              [formControl]="yearControl"
              (keyup.enter)="yearInput.blur()"
              (blur)="onYearSubmit()" />
          </div>
          <div tabindex="0"
            role="button"
            aria-label="Next Year"
            class="datepicker__calendar__nav__arrow"
            (click)="onArrowClick('right')" (keyup.enter)="onArrowClick('right')">
            <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
              <g>
                <path d="M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3
                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0
                    l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z"/>
              </g>
              <g>
                <path d="M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3
                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7
                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z"/>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="datepicker__calendar__content">
          <div class="datepicker__calendar__labels">
            <div
              class="datepicker__calendar__label"
              *ngFor="let day of dayNamesOrdered">
              {{ day }}
            </div>
          </div>
          <div
            [@calendarAnimation]="animate"
            class="datepicker__calendar__month">
            <div
              *ngFor="let day of calendarDays"
              class="datepicker__calendar__month__day"
              [ngStyle]="{'cursor': day == 0 ? 'initial' : 'pointer',
                'background-color': getDayBackgroundColor(day),
                'color': isHoveredDay(day) ? accentColor : getDayFontColor(day),
                'pointer-events': day == 0 ? 'none' : ''
                }"
              [attr.role]="day != 0 ? 'button' : null"
              [attr.aria-label]="day != 0 ? months[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear() : null"
              [attr.tabindex]="day != 0 ? 0 : null"
              (click)="onSelectDay(day)"
              (keyup.enter)="onSelectDay(day)"
              (mouseenter)="hoveredDay = day"
              (mouseleave)="hoveredDay = null">
              <span *ngIf="day != 0">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
          <div tabindex="0"
            class="datepicker__calendar__cancel"
            (click)="onCancel()"
            (keyup.enter)="onCancel()">
            {{cancelText}}
          </div>
        </div>
      </div>
    </div>
  </sam-label-wrapper>
    `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  private readonly DEFAULT_FORMAT = 'MM/DD/YYYY';

  private dateVal: Date;
  @Input() label: string;
  @Input() hint: string;
  @Input() name: string;
  // two way bindings
  @Output() dateChange = new EventEmitter<Date>();

  @Input() get date(): Date { return this.dateVal; };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
  }
  // api bindings
  @Input() disabled: boolean;
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() dateFormat: string | DateFormatFunction;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  // data
  @Input() placeholder: string = 'Select a date';
  @Input() inputText: string;
  // view logic
  @Input() showCalendar: boolean;
  @Input() cancelText: string = 'Cancel';
  @Input() weekStart: number = 0;
  // events
  @Output() onSelect = new EventEmitter<Date>();
  // time
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Default order: firstDayOfTheWeek = 0
  @Input() hoveredDay: Date;
  @Input() months: Array<string>;
  dayNamesOrdered: Array<String>;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  // animation
  animate: string;
  // colors
  colors: { [id: string]: string };
  // listeners
  clickListener: Function;
  // forms
  yearControl: FormControl;

  @ViewChild('calendarpopup') calendarpopup : ElementRef;
  @ViewChild('calendarButton') calendarButton : ElementRef;
  _focusableString: string =
  'a[href], area, button, select, textarea, *[tabindex], \
  input:not([type="hidden"])';
  @Input() control: AbstractControl;
  @Input() defaultValidations: boolean = true;
  @ViewChild('wrapper') wrapper;

  constructor(private renderer: Renderer, private elementRef: ElementRef) {
    this.dateFormat = this.DEFAULT_FORMAT;
    // view logic
    this.showCalendar = false;
    // colors
    this.colors = {
      'black': '#333333',
      'blue': '#1285bf',
      'lightGrey': '#f1f1f1',
      'white': '#ffffff'
    };
    this.accentColor = this.colors['blue'];
    this.altInputStyle = false;
    // time
    this.updateDayNames();

    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', ' December'
    ];
    // listeners
    this.clickListener = renderer.listenGlobal(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
    // form controls
    this.yearControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(4),
      this.yearValidator,
      this.inRangeValidator.bind(this)
    ]));
  }

  ngOnInit() {
    this.updateDayNames();
    this.syncVisualsWithDate();

    if (this.control && this.defaultValidations) {
        const validators: ValidatorFn[] = [];
        if (this.control.validator) {
            validators.push(this.control.validator);
        }
        // if (this.required) {
        //     //validators.push(SamDateComponent.dateRequired());
        // }
        validators.push(DatepickerComponent.dateValidation());
        this.control.setValidators(validators);
        this.control.statusChanges.subscribe(() => {
            this.wrapper.formatErrors(this.control);
        });
        this.wrapper.formatErrors(this.control);
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ((changes['date'] || changes['dateFormat'])) {
      this.syncVisualsWithDate();
    }
    if (changes['firstDayOfTheWeek'] || changes['dayNames']) {
      this.updateDayNames();
    }
  }

  ngOnDestroy() {
    this.clickListener();
  }

  // -------------------------------------------------------------------------------- //
  // -------------------------------- State Management ------------------------------ //
  // -------------------------------------------------------------------------------- //  
  /**
  * Closes the calendar and syncs visual components with selected or current date.
  * This way if a user opens the calendar with this month, scrolls to two months from now,
  * closes the calendar, then reopens it, it will open with the current month
  * or month associated with the selected date
  */
  closeCalendar(): void {
    this.showCalendar = false;
    this.syncVisualsWithDate();
    this.enablePageTabIndex();
  }

  /**
  * Sets the date values associated with the ui
  */
  private setCurrentValues(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];

    this.currentYear = date.getFullYear();
    this.yearControl.setValue(this.currentYear);

    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  /**
   * Update the day names order. The order can be modified with the firstDayOfTheWeek input, while 0 means that the
   * first day will be sunday.
   */
  private updateDayNames() {
    this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
    if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
      // Out of range
      throw Error(`The weekStart is not in range between ${0} and ${this.dayNamesOrdered.length - 1}`)
    } else {
      this.calendar = new Calendar(this.weekStart);
      this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
        .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
    }
  }
  syncInputWithCal(){
    if(this.inputText && this.inputText.length==10){
      let date = new Date(this.inputText);
      if(this.isDateValid(date) && !isNaN(date.getTime())){
        this.date = date;
        this.syncVisualsWithDate();
      }
      this.onChange(this.inputText);
    } else if (this.inputText === ''){
      this.onChange('');
    }
  }
  /**
  * Visually syncs calendar and input to selected date or current day
  */
  syncVisualsWithDate(): void {
    if (this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  /**
  * Sets the currentMonth and creates new calendar days for the given month
  */
  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  /**
  * Sets the currentYear and FormControl value associated with the year
  */
  setCurrentYear(year: number): void {
    this.currentYear = year;
    this.yearControl.setValue(year);
  }

  /**
  * Sets the visible input text
  */
  setInputText(date: Date): void {
    let inputText = "";
    const dateFormat: string | DateFormatFunction = this.dateFormat;
    if (dateFormat === undefined || dateFormat === null) {
      inputText = moment(date).format(this.DEFAULT_FORMAT);
    } else if (typeof dateFormat === 'string') {
      inputText = moment(date).format(dateFormat);
    } else if (typeof dateFormat === 'function') {
      inputText = dateFormat(date);
    }
    this.inputText = inputText;
  }

  // -------------------------------------------------------------------------------- //
  // --------------------------------- Click Handlers ------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Sets the date values associated with the calendar.
  * Triggers animation if the month changes
  */
  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    let newDate = new Date(newYear, newMonth);
    let newDateValid: boolean;
    if (direction === 'left') {
      newDateValid = !this.rangeStart || newDate.getTime() >= this.rangeStart.getTime();
    } else if (direction === 'right') {
      newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
    }

    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
  }

  /**
   * Check if a date is within the range.
   * @param date The date to check.
   * @return true if the date is within the range, false if not.
   */
  isDateValid(date: Date): boolean {
    return (!this.rangeStart || date.getTime() >= this.rangeStart.getTime()) &&
            (!this.rangeEnd || date.getTime() <= this.rangeEnd.getTime());
  }

  /**
   * Filter out the days that are not in the date range.
   * @param calendarDays The calendar days
   * @return {Array} The input with the invalid days replaced by 0
   */
  filterInvalidDays(calendarDays: Array<number>): Array<number> {
    let newCalendarDays = [];
    calendarDays.forEach((day: number | Date) => {
      if (day === 0 || !this.isDateValid(<Date> day)) {
        newCalendarDays.push(0)
      } else {
        newCalendarDays.push(day)
      }
    });
    return newCalendarDays;
  }

  /**
  * Closes the calendar when the cancel button is clicked
  */
  onCancel(): void {
    this.closeCalendar();
  }

  /**
  * Toggles the calendar when the date input is clicked
  */
  onInputClick(): void {
    this.showCalendar = !this.showCalendar;
    if(this.showCalendar){
      this.disablePageTabIndex();
    } else {
      this.enablePageTabIndex();
    }
  }

  /**
  * Toggles the calendar when the date input is clicked
  */
  displayCalendar(): void {
    this.showCalendar = true;
    this.disablePageTabIndex();
  }

  disablePageTabIndex(){
    let els = document.querySelectorAll(this._focusableString);
    for(let i = 0; i < els.length; i++){
      let el = els.item(i);
      let tabindex = el.getAttribute('tabindex') ? el.getAttribute('tabindex') : '0';
      if(!el.getAttribute('tabindex')){
        el.setAttribute('data-sam-noinitial-tabindex','1');
      }
      el.setAttribute('data-sam-tabindex', tabindex);
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-hidden', 'true');
    }
  }

  enablePageTabIndex(){
    let els = document.querySelectorAll('*[data-sam-tabindex]');
    for(let i = 0; i < els.length; i++){
      let el = els.item(i);
      if(el.hasAttribute('data-sam-noinitial-tabindex')){
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex',el.getAttribute('data-sam-tabindex'));
      }
      el.removeAttribute('data-sam-tabindex');
      el.setAttribute('aria-hidden', 'false');
    }
  }

  /**
  * Returns the font color for a day
  */
  onSelectDay(day: Date): void {
    if (this.isDateValid(day)) {
      this.date = day;
      this.onSelect.emit(day);
      this.showCalendar = !this.showCalendar;
      this.syncVisualsWithDate();
      this.enablePageTabIndex();
      this.onChange(this.inputText);
    }
  }

  /**
  * Sets the current year and current month if the year from
  * yearControl is valid
  */
  onYearSubmit(): void {
    if (this.yearControl.valid && +this.yearControl.value !== this.currentYear) {
      this.setCurrentYear(+this.yearControl.value);
      this.setCurrentMonth(this.currentMonthNumber);
    } else {
      this.yearControl.setValue(this.currentYear);
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Listeners ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar if a click is not within the datepicker component
  */
  handleGlobalClick(event: MouseEvent): void {
    if(this.showCalendar && this.calendarpopup){
      const withinElement = this.calendarpopup.nativeElement.contains(event.target);
      if (!withinElement && this.calendarButton.nativeElement!=event.target) {
        this.showCalendar = false;
        this.enablePageTabIndex();
      }
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Helpers ------------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Returns the background color for a day
  */
  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  /**
  * Returns the font color for a day
  */
  getDayFontColor(day: Date): string {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    }
    return color;
  }

  /**
  * Returns whether a day is the chosen day
  */
  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() === this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the current calendar day
  */
  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the day currently being hovered
  */
  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
  }

  /**
  * Triggers an animation and resets to initial state after the duration of the animation
  */
  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }

  // -------------------------------------------------------------------------------- //
  // ---------------------------------- Validators ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Validates that a value is within the 'rangeStart' and/or 'rangeEnd' if specified
  */
  inRangeValidator(control: FormControl): ValidationResult {
    const value = control.value;

    if (this.currentMonthNumber) {
      const tentativeDate = new Date(+value, this.currentMonthNumber);
      if (this.rangeStart && tentativeDate.getTime() < this.rangeStart.getTime()) {
        return { 'yearBeforeRangeStart': true };
      }
      if (this.rangeEnd && tentativeDate.getTime() > this.rangeEnd.getTime()) {
        return { 'yearAfterRangeEnd': true };
      }
      return null;
    }

    return { 'currentMonthMissing': true };
  }

  /**
  * Validates that a value is a number greater than or equal to 1970
  */
  yearValidator(control: FormControl): ValidationResult {
    const value = control.value;
    const valid = !isNaN(value) && value >= 1970 && Math.floor(value) === +value;
    if (valid) {
      return null;
    }
    return { 'invalidYear': true };
  }

  onChange = (val)=>{};
  onTouched = ()=>{};
  registerOnChange(fn){
    this.onChange = fn;
  }

  registerOnTouched(fn){
    this.onTouched = fn;
  }

  setDisabledState(newState: boolean){
    this.disabled = newState;
  }

  writeValue(val){
    this.inputText = val;
  }

  static dateValidation() {
    const minYear = 1000;
    return (c: AbstractControl) => {
        const error = {
            dateError: {
                message: ''
            }
        };
        if (c.dirty && (c.value && c.value !== undefined)) {
            const dateM = moment(c.value);
            if (!dateM.isValid()) {
                error.dateError.message = 'Invalid date';
                return error;
            } else {
                if (dateM.get('year') < minYear) {
                    error.dateError.message = 'Please enter 4 digit year';
                    return error;
                }
            }
        }
        return undefined;
    };
}
}
/* tslint:enable */
