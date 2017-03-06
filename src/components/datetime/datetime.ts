import { OnInit, ViewChild, ElementRef } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
let Flatpickr = require('flatpickr');
let _get = require('lodash/get');

export interface DateTimeOptions extends BaseOptions<any> {
    placeholder?: string,
    format?: string,
    enableDate?: boolean,
    enableTime?: boolean,
    datepickerMode?: string,
    showWeeks?: boolean,
    startingDay?: string,
    initDate?: string,
    minMode?: string,
    maxMode?: string,
    yearRange?: string,
    hourStep?: number,
    minuteStep?: number,
    showMeridian?: boolean,
    readonlyInput?: boolean,
    mousewheel?: boolean,
    arrowkeys?: boolean,
    minDate?: string,
    maxDate?: string
}

export class DateTimeComponent extends BaseComponent<DateTimeOptions> {
    public setValue(value: any) {
        super.setValue((value instanceof Date) ? value.toISOString() : value);
    }
}
export class DateTimeElement extends BaseElement<DateTimeComponent> implements OnInit {
    public flatPicker: any;
    @ViewChild('flatpickr') flatPickerInput: ElementRef;

    ngOnInit() {
        super.ngOnInit();
        this.flatPicker = new Flatpickr(this.flatPickerInput.nativeElement, this.dateConfig);
        setTimeout(() => this.flatPicker.setDate(new Date(this.component.control.value)), 10);
        if (!window['hasFlatPickrCSS']) {
            window['hasFlatPickrCSS'] = true;
            // TO-DO: Figure out a way to use Webpack (loader) with Typescipt builds.
            var css = '.flatpickr-calendar{background:transparent;overflow:hidden;max-height:0;opacity:0;visibility:hidden;text-align:center;padding:0;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:315px;box-sizing:border-box;transition:top cubic-bezier(0,1,0.5,1) 100ms;background:#fff;box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08)}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;visibility:visible;overflow:visible;max-height:640px}.flatpickr-calendar.open{display:inline-block;animation:flatpickrFadeInDown 300ms cubic-bezier(0,1,0.5,1);z-index:99999}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.hasWeeks{width:auto}.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:\'\';height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.rightMost:after{left:auto;right:22px}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-month{background:transparent;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9);height:28px;line-height:24px;text-align:center;position:relative;user-select:none}.flatpickr-prev-month,.flatpickr-next-month{text-decoration:none;cursor:pointer;position:absolute;top:10px;height:16px;line-height:16px}.flatpickr-prev-month i,.flatpickr-next-month i{position:relative}.flatpickr-prev-month.flatpickr-prev-month,.flatpickr-next-month.flatpickr-prev-month{left:calc(3.57% - 1.5px)}.flatpickr-prev-month.flatpickr-next-month,.flatpickr-next-month.flatpickr-next-month{right:calc(3.57% - 1.5px)}.flatpickr-prev-month:hover,.flatpickr-next-month:hover{color:#959ea9}.flatpickr-prev-month:hover svg,.flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-prev-month svg,.flatpickr-next-month svg{width:14px}.flatpickr-prev-month svg path,.flatpickr-next-month svg path{transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,0.05);box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,0.1)}.numInputWrapper span:active{background:rgba(0,0,0,0.2)}.numInputWrapper span:after{display:block;content:"";position:absolute;top:33%}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,0.6)}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,0.6)}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,0.5)}.numInputWrapper:hover{background:rgba(0,0,0,0.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;top:5px;display:inline-block;text-align:center}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:7px;padding:0}.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,0.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,0.9)}.flatpickr-current-month input.cur-year{background:transparent;box-sizing:border-box;color:inherit;cursor:default;padding:0 0 0 .5ch;margin:0;display:inline;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:initial;border:0;border-radius:0;vertical-align:initial}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,0.5);background:transparent;pointer-events:none}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden}.flatpickr-days,.flatpickr-weeks{padding:1px 0 0}.flatpickr-days{padding:0;outline:0;text-align:left;width:315px;box-sizing:border-box;display:inline-block;display:flex;flex-wrap:wrap;justify-content:space-around}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;flex-basis:14.2857143%;max-width:40px;height:40px;line-height:40px;margin:0;display:inline-block;position:relative;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-day.disabled,.flatpickr-day.disabled:hover{pointer-events:none}.flatpickr-day.disabled,.flatpickr-day.disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57,57,57,0.3);background:transparent;border-color:transparent;cursor:default}span.flatpickr-weekday{cursor:default;font-size:90%;color:rgba(0,0,0,0.54);height:27.333333333333px;line-height:24px;margin:0;background:transparent;text-align:center;display:block;float:left;width:14.28%;font-weight:700;margin:0;padding-top:3.3333333333333px}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{display:inline-block;float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:1px 12px 0;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%}.flatpickr-weekwrapper span.flatpickr-day{display:block;width:100%;max-width:none}.flatpickr-innerContainer{display:block;display:flex;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;box-sizing:border-box;overflow:hidden;transition:height .33s cubic-bezier(0,1,0.5,1);display:flex}.flatpickr-time:after{content:"";display:table;clear:both}.flatpickr-time .numInputWrapper{flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;cursor:pointer;color:#393939;font-size:14px;position:relative;box-sizing:border-box}.flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;display:inline-block;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;user-select:none}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time .flatpickr-am-pm:focus{background:#f0f0f0}.hasWeeks .flatpickr-days,.hasTime .flatpickr-days{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.hasWeeks .flatpickr-days{border-left:0}@media all and (-ms-high-contrast: none){.flatpickr-month{padding:0}.flatpickr-month svg{top:0!important}}.flatpickr-input{cursor:pointer}@-moz-keyframes flatpickrFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:none}}@-webkit-keyframes flatpickrFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:none}}@-o-keyframes flatpickrFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:none}}@keyframes flatpickrFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:none}}';
            var head = document.getElementsByTagName("head")[0];
            var s = document.createElement("style");
            s.appendChild(document.createTextNode(css));
            head.appendChild(s);
        }
    }

    convertFormat(format:string) {
        // Year conversion.
        format = format.replace(/y/g, 'Y');
        format = format.replace('YYYY', 'Y');
        format = format.replace('YY', 'y');

        // Month conversion.
        format = format.replace('MMMM', 'F');
        format = format.replace(/M/g, 'n');
        format = format.replace('nnn', 'M');
        format = format.replace('nn', 'm');

        // Day in month.
        format = format.replace(/d/g, 'j');
        format = format.replace('jj', 'd');

        // Day in week.
        format = format.replace('EEEE', 'l');
        format = format.replace('EEE', 'D');

        // Hours, minutes, seconds
        format = format.replace('HH', 'H');
        format = format.replace('hh', 'h');
        format = format.replace('mm', 'i');
        format = format.replace('ss', 'S');
        format = format.replace(/a/g, 'K');
        return format;
    }

    get dateConfig() {
        return {
            altInput: true,
            clickOpens: !this.component.control.disabled,
            enableDate: true,
            allowInput: !this.component.control.disabled,
            mode: this.component.settings.multiple ? 'multiple' : 'single',
            enableTime: _get(this.component.settings, 'enableTime', true),
            noCalendar: !_get(this.component.settings, 'enableDate', true),
            altFormat: this.convertFormat(_get(this.component.settings, 'format', '')),
            dateFormat: 'U',
            defaultDate: _get(this.component.settings, 'defaultDate', ''),
            hourIncrement: _get(this.component.settings, 'timePicker.hourStep', 1),
            minuteIncrement: _get(this.component.settings, 'timePicker.minuteStep', 5),
            onChange: (date:any) => this.component.setValue(date[0])
        };
    }
}

export function DateTimeField(template:FormioTemplate) {
    FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
