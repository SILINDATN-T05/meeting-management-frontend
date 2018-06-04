import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
    @Output('onFilter') public onFilter: EventEmitter<any> = new EventEmitter();
    // tslint:disable-next-line:no-input-rename
    @Input('columnID') public columnID: string = null;
    // tslint:disable-next-line:no-input-rename
    @Input('filterName') public filterName: string = null;
    // tslint:disable-next-line:no-input-rename
    @Input('icon') public icon: string = null;
    // tslint:disable-next-line:no-input-rename
    @Input('trigger') public trigger = 3;
    // tslint:disable-next-line:no-input-rename
    @Input('enabled') public enabled = true;

    filterFieldValue = '';
    filter = {};
    filterBtnEnable = true;

    selectedValue = '';
    filterTypes = [
        { value: 'contain', viewValue: 'Contain' },
        { value: 'notContain', viewValue: 'Not Contain' },
        { value: 'startWith', viewValue: 'Start With' },
        { value: 'endWith', viewValue: 'End With' },
        { value: 'equal', viewValue: 'Equal' },
        { value: 'notEqual', viewValue: 'Not Equal' },
    ];

    constructor() {}

    ngOnInit() {}

    public SubmitFilter() {
        this.createFilterPhrase();
        // console.log(`Sent Query ${JSON.stringify(this.filter)}`);
        this.onFilter.emit(this.filter);
        this.resetParameters();
    }

    resetParameters() {
        this.filterBtnEnable = false;
        this.filterFieldValue = '';
        this.selectedValue = '';
        this.filter = {};
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    clearFilterInput(event) {
        this.stopPropagation(event);
        this.filterFieldValue = '';
    }

    createFilterPhrase() {
        this.filter[this.columnID] = {
            $regex: '',
            $options: 'i',
        };
        switch (this.selectedValue) {
            case 'contain':
                this.filter[this.columnID].$regex = `.*${this.filterFieldValue}.*$`;
                break;
            case 'notContain':
                this.filter[this.columnID].$regex = `^((?!${this.filterFieldValue}).)*$`;
                break;
            case 'startWith':
                this.filter[this.columnID].$regex = `^${this.filterFieldValue}.*$`;
                break;
            case 'endWith':
                this.filter[this.columnID].$regex = `${this.filterFieldValue}$`;
                break;
            case 'equal':
                this.filter[this.columnID].$regex = `${this.filterFieldValue}`;
                this.filter[this.columnID].$options = '';
                break;
            case 'notEqual':
                this.filter[this.columnID].$regex = `^((?!${this.filterFieldValue}).)*$`;
                this.filter[this.columnID].$options = '';
                break;
            default:
                delete this.filter[this.columnID];
                break;
        }
    }

    onfilterFieldTextChange(phrase: string) {
        if (phrase.length >= this.trigger) {
            this.filterBtnEnable = true;
        } else {
            this.filterBtnEnable = false;
        }
    }
}
