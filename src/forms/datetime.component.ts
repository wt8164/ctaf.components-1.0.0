import {
    NgModule, Component, ElementRef, AfterViewInit, OnDestroy, OnInit, Input, Output, SimpleChange
    , EventEmitter, forwardRef, Renderer, trigger, state, style, transition, animate, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../3rd/primeng/button/button';
import { InputTextModule } from '../../3rd/primeng/inputtext/inputtext';
import { DomHandler } from '../../3rd/primeng/dom/domhandler';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ComponentBase, CTAFComponent } from '@ctaf/framework';
import * as _ from 'underscore';
// import './datetime.less';
/* tslint:disable */
export const CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimeComponent),
    multi: true
};

export interface LocaleSetting {
    firstDayOfWeek?: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
}

@CTAFComponent({
    selector: 'ctaf-cp-datetimepicker',
    templateUrl: 'datetime.component.html',
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('100ms ease-in')),
            transition('hidden => visible', animate('100ms ease-out'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler, CALENDAR_VALUE_ACCESSOR]
})

export class DatetimeComponent extends ComponentBase implements ControlValueAccessor {
    @Input() defaultDate: Date | string;

    @Input() style: string;

    private _Style: string = 'primary';
    @Input()
    set Style(s: string) {
        this._Style = s;
        this.setProperty('_style', s);
        this.classesMap();
    }

    get Style(): string {
        return this._Style;
    }

    protected classesMap(): any {
        return _.extend(super.classesMap(), {
            // 'btn': true,
            ['ui-' + this._Style]: true,
        });
    }

    @Input() styleClass: string;

    @Input() inputStyle: string;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() disabled: any;

    @Input() dateFormat: string = 'mm/dd/yy';

    @Input() inline: boolean = false;

    @Input() showOtherMonths: boolean = true;

    @Input() selectOtherMonths: boolean;

    @Input() showIcon: boolean;

    @Input() icon: string = 'fa-calendar';

    @Input() appendTo: any;

    @Input() readonlyInput: boolean;

    @Input() shortYearCutoff: any = '+10';

    @Input() minDate: string;
    // @Input() minDate: Date = new Date('05-01-2015');

    // @Input() maxDate: Date;
    @Input() maxDate: string;

    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() yearRange: string = (new Date).getFullYear() - 20 + ':' + (new Date).getFullYear();

    @Input() showTime: boolean;

    @Input() hourFormat: string = '24';

    @Input() timeOnly: boolean;

    @Input() size: number;

    @Input() labelWidth: number;

    @Input() labelText: string;

    @Input() daysOfWeekDisabled: boolean;

    @Input() dataType: string = 'date';

    @Input() JustifyRight: boolean;

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Input() locale: LocaleSetting = {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    @ViewChild('datepicker') overlayViewChild: ElementRef;

    value: Date = new Date();

    dates: any[];

    weekDays: string[] = [];

    currentMonthText: string;

    currentMonth: number;

    currentYear: number;

    currentHour: number;

    currentMinute: number;

    pm: boolean;

    overlay: HTMLDivElement;

    overlayVisible: boolean;

    closeOverlay: boolean = true;

    dateClick: boolean;

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    calendarElement: any;

    documentClickListener: any;

    ticksTo1970: number;

    yearOptions: number[];

    focus: boolean;

    filled: boolean;

    // inputFieldValue: Date = new Date();

    inputFieldValue: string;
    // inputFieldValue: Date = this.defaultDate as Date;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer, cdr: ChangeDetectorRef) {
        super(cdr);

    }
    
    /**
     * DomHandler
     */
    getViewport(): any {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return { width: w, height: h };
    }

    getHiddenElementDimensions(element: any): any {
        let dimensions: any = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    public relativePosition(element: any, target: any): void {
        let elementDimensions = element.offsetParent ? { width: element.outerWidth, height: element.outerHeight } : this.getHiddenElementDimensions(element);
        let targetHeight = target.offsetHeight;
        let targetWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let viewport = this.getViewport();
        let top, left;

      /* tslint:disable */  if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height)
            top = -1 * (elementDimensions.height);
     /* tslint:disable */   else
            top = targetHeight;

       /* tslint:disable */ if ((targetOffset.left + elementDimensions.width) > viewport.width)
            left = targetWidth - elementDimensions.width;
     /* tslint:disable */   else
            left = 0;
        if(top>0){
            top = top - 1;
        }
        else{
            top = top + 1;
        }
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    ngOnInit() {
        //this.inputFieldValue = this.defaultDate as Date || new Date();
        this.updateInputfield();
        if (this.defaultDate && typeof this.defaultDate === 'string') {
            // this.defaultDate = new Date(this.defaultDate.replace(/-/g, "/"));
            let ctime = new Date(this.defaultDate)
            if (ctime instanceof Date) {
                this.defaultDate = ctime;
            }
        }
        let today = new Date();
        let date: Date = (this.defaultDate as Date) || new Date();
        let dayIndex = this.locale.firstDayOfWeek;
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }

        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.pm = date.getHours() > 11;

            if (this.hourFormat == '12')
                this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
            else
                this.currentHour = date.getHours();
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
        }

        this.createMonth(this.currentMonth, this.currentYear);

        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (this.closeOverlay) {
                this.overlayVisible = false;
            }

            this.closeOverlay = true;
            this.dateClick = false;

            this.forceChange();
        });

        this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
            Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);

        if (this.yearNavigator) {
            this.yearOptions = [];
            let years = this.yearRange.split(':'),
                yearStart = parseInt(years[0]),
                yearEnd = parseInt(years[1]);

            for (let i = yearStart; i <= yearEnd; i++) {
                this.yearOptions.push(i);
            }
        }
    }

    ngAfterViewInit() {
        this.overlay = <HTMLDivElement>this.overlayViewChild.nativeElement;

        if (!this.inline && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.appendTo.appendChild(this.overlay);
        }
    }

    createMonth(month: number, year: number) {
        this.dates = [];
        this.currentMonth = month;
        this.currentYear = year;
        this.currentMonthText = this.locale.monthNames[month];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let sundayIndex = this.getSundayIndex();
        let dayNo = 1;

        for (let i = 0; i < 6; i++) {
            let week = [];

            if (i == 0) {
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true, selectable: this.isSelectable(j, prev.month, prev.year) });
                }

                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, selectable: this.isSelectable(dayNo, month, year) });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getPreviousMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year)
                        });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, selectable: this.isSelectable(dayNo, month, year) });
                    }

                    dayNo++;
                }
            }

            this.dates.push(week);
        }
    }

    prevMonth(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }

        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    }

    nextMonth(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }

        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    }

    /**
     * 渲染禁用
     */
    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }

        if (dateMeta.otherMonth) {
            if (this.selectOtherMonths)
                this.selectDate(dateMeta);
        }
        else {
            this.selectDate(dateMeta);
        }
        this.overlayVisible=false;
        this.dateClick = true;
        this.updateInputfield();
        event.preventDefault();
    }

    updateInputfield() {
        if (!this.value) {
            this.value = new Date();
        }
        let formattedValue;

        if (this.timeOnly) {
            formattedValue = this.formatTime(this.value);
        }
        else {
            formattedValue = this.formatDate(this.value, this.dateFormat);
            if (this.showTime) {
                formattedValue += ' ' + this.formatTime(this.value);
            }
        }
        // this.updateUI();
        this.inputFieldValue = formattedValue;

        // console.log(formattedValue);
        this.forceChange();

        // else {
        //     this.inputFieldValue = '';
        //     // this.inputFieldValue = new Date;
        // }

        this.updateFilledState();
    }

    selectDate(dateMeta) {
        this.value = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat === '12' && this.pm && this.currentHour != 12)
                this.value.setHours(this.currentHour + 12);
            else
                this.value.setHours(this.currentHour);

            this.value.setMinutes(this.currentMinute);
        }
        this.updateModel();
        this.onSelect.emit(this.value);
    }

    updateModel() {
        if (this.dataType == 'date')
            this.onModelChange(this.value);
        else if (this.dataType == 'string')
            this.onModelChange(this.formatDate(this.value, this.dateFormat));
    }

    getFirstDayOfMonthIndex(month: number, year: number) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);

        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }

    getDaysCountInMonth(month: number, year: number) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }

    getDaysCountInPrevMonth(month: number, year: number) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }

    getPreviousMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }

        return { 'month': m, 'year': y };
    }

    getNextMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
        }

        return { 'month': m, 'year': y };
    }

    getSundayIndex() {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    }

    isSelected(dateMeta): boolean {
        if (this.value)
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        else
            return false;
    }

    isToday(dateMeta): boolean {
        let today = new Date();

        return today.getDate() === dateMeta.day && today.getMonth() === dateMeta.month && today.getFullYear() === dateMeta.year;
    }

    isSelectable(day, month, year): boolean {
        let validMin = true;
        let validMax = true;

        // if(this.minDate && typeof this.minDate==='string'){
        //     
        // }
        let mintime = new Date(this.minDate);
        if (mintime) {
            if (mintime.getFullYear() > year) {
                validMin = false;
            }
            else if (mintime.getFullYear() === year) {
                if (mintime.getMonth() > month) {
                    validMin = false;
                }
                else if (mintime.getMonth() === month) {
                    if (mintime.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }

        let maxtime = new Date(this.maxDate);
        if (maxtime) {
            if (maxtime.getFullYear() < year) {
                validMax = false;
            }
            else if (maxtime.getFullYear() === year) {
                if (maxtime.getMonth() < month) {
                    validMax = false;
                }
                else if (maxtime.getMonth() === month) {
                    if (maxtime.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }

        return validMin && validMax;
    }

    onInputFocus(event) {
        this.focus = true;
        this.showOverlay(event);
    }

    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit(event);
        this.onModelTouched();
        // console.log(1);
    }

    onButtonClick(event, inputfield) {
        this.closeOverlay = false;

        if (!this.overlay.offsetParent)
            inputfield.focus();
        else
            this.closeOverlay = true;
    }

    onInputKeydown(event) {
        if (event.keyCode === 9) {
            this.overlayVisible = false;
        }
        // if (event.keyCode < 48 || event.keyCode > 57) {
        //     // event.keyCode = 0;
        //     event.preventDefault();
        //     console.log(event.keyCode);
        // }
    }

    onInputKeyup(event) {
        // this.inputFieldValue = this.inputFieldValue.replace(/\D/g, '');
        // console.log(1);
        var keyCode = event.keyCode;

    }

    onMonthDropdownChange(m: string) {
        this.currentMonth = parseInt(m);
        this.createMonth(this.currentMonth, this.currentYear);
    }

    onYearDropdownChange(y: string) {
        this.currentYear = parseInt(y);
        this.createMonth(this.currentMonth, this.currentYear);
    }

    incrementHour(event) {
        if (this.hourFormat == '24') {
            if (this.currentHour === 23)
                this.currentHour = 0;
            else
                this.currentHour++;
        }
        else if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                this.currentHour = 0;
            else
                this.currentHour++;
        }

        this.updateTime();

        event.preventDefault();
    }

    decrementHour(event) {
        if (this.hourFormat == '24') {
            if (this.currentHour === 0)
                this.currentHour = 23;
            else
                this.currentHour--;
        }
        else if (this.hourFormat == '12') {
            if (this.currentHour === 0)
                this.currentHour = 12;
            else
                this.currentHour--;
        }

        this.updateTime();

        event.preventDefault();
    }

    incrementMinute(event) {
        if (this.currentMinute === 59)
            this.currentMinute = 0;
        else {
            this.currentMinute++;
        }

        this.updateTime();

        event.preventDefault();
    }

    decrementMinute(event) {
        if (this.currentMinute === 0)
            this.currentMinute = 59;
        else
            this.currentMinute--;

        this.updateTime();

        event.preventDefault();
    }

    updateTime() {
        this.value = this.value || new Date();
        if (this.hourFormat === '12' && this.pm && this.currentHour != 12)
            this.value.setHours(this.currentHour + 12);
        else
            this.value.setHours(this.currentHour);

        this.value.setMinutes(this.currentMinute);
        this.updateModel();
        this.onSelect.emit(this.value);
        this.updateInputfield();
    }

    toggleAMPM(event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    }

    onInput(event) {
        try {
            this.value = this.parseValueFromString(event.target.value);
            this.updateUI();
        }
        catch (err) {
            //invalid date
            this.value = null;
        }

        this.updateModel();
        this.updateFilledState();
    }

    parseValueFromString(text: string): Date {
        let dateValue;
        let parts: string[] = text.split(' ');

        if (this.timeOnly) {
            dateValue = new Date();
            this.populateTime(dateValue, parts[0], parts[1]);
        }
        else {
            if (this.showTime) {
                dateValue = this.parseDate(parts[0], this.dateFormat);
                this.populateTime(dateValue, parts[1], parts[2]);
            }
            else {
                dateValue = this.parseDate(text, this.dateFormat);
            }
        }

        return dateValue;
    }

    populateTime(value, timeString, ampm) {
        let time = this.parseTime(timeString);

        if (this.hourFormat == '12') {
            if (!ampm)
                throw 'Invalid Time';
            else if (ampm.toLowerCase() === 'PM' && time.hour != 12)
                value.setHours(time.hour + 12);
        }
        else {
            value.setHours(time.hour);
        }

        value.setMinutes(time.minute);
    }

    updateUI() {
        if (this.defaultDate && typeof this.defaultDate === 'string') {
            // this.defaultDate = new Date(this.defaultDate.replace(/-/g, "/"));
            this.defaultDate = new Date(this.defaultDate);
        }
        let date: Date = (this.defaultDate as Date) || this.value || new Date();
        this.createMonth(date.getMonth(), date.getFullYear());

        if (this.showTime || this.timeOnly) {
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
        }
    }

    onDatePickerClick(event) {
        this.closeOverlay = this.dateClick;
    }

    showOverlay(event) {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlay, event.target);
        else
            this.relativePosition(this.overlay, event.target);
        if (this.JustifyRight) {
            this.overlay.style.left = 'auto';
            this.overlay.style.right = 0 + 'px';
        };
        this.overlayVisible = true;
        this.overlay.style.zIndex = String(++DomHandler.zindex);
    }

    writeValue(value: any): void {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }

        this.updateInputfield();
        this.updateUI();
        this.forceChange();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    // Ported from jquery-ui datepicker formatDate    
    formatDate(date, format) {
        if (!date) {
            return '';
        }

        let iFormat,
            lookAhead = (match) => {
                let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            formatNumber = (match, value, len) => {
                let num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            },
            formatName = (match, value, shortNames, longNames) => {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            },
            output = '',
            literal = false;

        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\''))
                        literal = false;
                    else
                        output += format.charAt(iFormat);
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o',
                                Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case 'y':
                            output += (lookAhead('y') ? date.getFullYear() :
                                (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\''))
                                output += '\'';
                            else
                                literal = true;

                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }

    formatTime(date) {
        if (!date) {
            return '';
        }

        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (this.hourFormat == '12' && this.pm && hours != 12) {
            hours -= 12;
        }

        output += (hours < 10) ? '0' + hours : hours;
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;

        if (this.hourFormat == '12') {
            output += this.pm ? ' PM' : ' AM';
        }

        return output;
    }

    parseTime(value) {
        let tokens: string[] = value.split(':');
        if (tokens.length !== 2) {
            throw 'Invalid time';
        }

        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12)) {
            throw 'Invalid time';
        }
        else {
            if (this.hourFormat == '12' && h !== 12) {
                h += 12;
            }

            return { hour: parseInt(tokens[0]), minute: parseInt(tokens[1]) };
        }
    }

    // Ported from jquery-ui datepicker parseDate 
    parseDate(value, format) {
        if (format == null || value == null) {
            throw 'Invalid arguments';
        }

        value = (typeof value === 'object' ? value.toString() : value + '');
        if (value === '') {
            return null;
        }

        let iFormat, dim, extra,
            iValue = 0,
            shortYearCutoff = (typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)),
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = false,
            date,
            lookAhead = (match) => {
                let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = (match) => {
                let isDoubled = lookAhead(match),
                    size = (match === '@' ? 14 : (match === '!' ? 20 :
                        (match === 'y' && isDoubled ? 4 : (match === 'o' ? 3 : 2)))),
                    minSize = (match === 'y' ? size : 1),
                    digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
                    num = value.substring(iValue).match(digits);
                if (!num) {
                    throw 'Missing number at position ' + iValue;
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            getName = (match, shortNames, longNames) => {
                let index = -1;
                let arr = lookAhead(match) ? longNames : shortNames;
                let names = [];

                for (let i = 0; i < arr.length; i++) {
                    names.push([i, arr[i]]);
                }
                names.sort((a, b) => {
                    return -(a[1].length - b[1].length);
                });

                for (let i = 0; i < names.length; i++) {
                    let name = names[i][1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = names[i][0];
                        iValue += name.length;
                        break;
                    }
                }

                if (index !== -1) {
                    return index + 1;
                } else {
                    throw 'Unknown name at position ' + iValue;
                }
            },
            checkLiteral = () => {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw 'Unexpected literal at position ' + iValue;
                }
                iValue++;
            };

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', this.locale.dayNamesShort, this.locale.dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', this.locale.monthNamesShort, this.locale.monthNames);
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        date = new Date((getNumber('!') - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '\'':
                        if (lookAhead('\'')) {
                            checkLiteral();
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }

        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw 'Extra/unparsed characters found in date: ' + extra;
            }
        }

        if (year === -1) {
            year = new Date().getFullYear();
        } else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }

        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }

        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw 'Invalid date'; // E.g. 31/02/00
        }
        return date;
    }

    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }

    updateFilledState() {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
        // this.filled = this.inputFieldValue;
    }

    ngOnDestroy() {
        if (!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    // protected classesMap(): any {
    //     return _.extend(super.classesMap(), {
    //         ['ui-' + this._style]: true,
    //     });
    // }
}

// @NgModule({
//     imports: [CommonModule, ButtonModule, InputTextModule],
//     exports: [DatetimeComponent, ButtonModule, InputTextModule],
//     declarations: [DatetimeComponent]
// })
// export class CalendarModule { }
// import { CTAFComponent, OnInit, ComponentBase, Input, Output, HostBinding, EventEmitter, ViewChild, ElementRef } from '@ctaf/framework';
// import * as _ from 'underscore';

// // import './datetimepicker.less';
// import './datetime.less';
// import '../../3rd/datetimepicker/datetimepicker.js';
// import '../../3rd/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js';
// // datetimepicker的github地址https://github.com/smalot/bootstrap-datetimepicker

// /**
//  * datetime
//  * 基础信息

// * 代码文件路径： src/forms/datetime.component.ts
// * 引用模块：ctafframework
// * 父类：CTAFCompentBase
// * RadioboxComponent
// * 选择器名称：ctaf-cp-datetime
// */

// /**
//  * 代码结构
//  * @CTAFComponent({
//  *     selector:'ctaf-cp-datetime',
//  *     templateUrl:'datetime.component.html'
//  * })
//  * export class DatetimeComponent extends ComponentBase
//  * {
//  * }
//  */

// @CTAFComponent({
//     selector: 'ctaf-cp-datetime',
//     templateUrl: 'datetime.component.html',
//     // styleUrls: ['datetime.component.less']
// })
// export class DatetimeComponent extends ComponentBase {
//     /**
//      * label文字
//      */
//     private _label: string = '';
//     @Input()
//     set label(l: string) {
//         this.setProperty('_label', l);
//     }
//     get label(): string {
//         return this._label;
//     }

//     private _width: number = 2;
//     @Input()
//     set width(w: number) {
//         this.setProperty('_width', w);
//     }
//     get width(): number {
//         return this._width;
//     }

//     /**
//      * 开始视图
//      */
//     private _start: number = 2;
//     @Input()
//     set startView(s: number) {
//         this.setProperty('_start', s);
//     }
//     get startView(): number {
//         return this._start;
//     }

//     /**
//      *日期格式 
//      */
//     private _format: string = 'yyyy-MM-dd';
//     @Input()
//     set format(f: string) {
//         this.setProperty('_format', f);
//     }
//     get format(): string {
//         return this._format;
//     }

//     /**
//      * 组件语言
//      */
//     private _language: string = '';
//     @Input()
//     set language(l: string) {
//         this.setProperty('_language', l);
//     }
//     get language(): string {
//         return this._language;
//     }

//     private _icon: string = 'calendar';
//     @Input()
//     set icon(i: string) {
//         this.setProperty('_icon', i);
//     }
//     get icon(): string {
//         return this._icon;
//     }

//     private _value: string;
//     @Input()
//     set value(v: string) {
//         this.setProperty('_value', v);
//     }
//     get value(): string {
//         return this._value;
//     }


//     @ViewChild('element') ele: ElementRef;
//     public ngOnInit(): void {
//         // console.log(this._value);
//         $(this.ele.nativeElement).datetimepicker({
//             language: this._language,
//             weekStart: 1,
//             todayBtn: 1,
//             autoclose: 1,
//             todayHighlight: 1,
//             startView: this._start,
//             forceParse: 0,
//             showMeridian: 0,
//             // minView: 0,
//             // maxView: 1,
//             format: this._format
//         });
//     }
// }
