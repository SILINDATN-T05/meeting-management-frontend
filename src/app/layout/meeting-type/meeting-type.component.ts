import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { RequestService } from '../../shared/services/request.service';
import { AddMeetingTypeDialogComponent } from '../components/add-meeting-type-dialog/add-meeting-type-dialog.component';

@Component({
    selector: 'app-meeting-type',
    templateUrl: './meeting-type.component.html',
    styleUrls: ['./meeting-type.component.scss'],
    animations: [routerTransition()],
})
export class MeetingTypesComponent implements OnInit {
    searchForm: FormGroup;
    searchData: object = {};
    data = {
        column: [{
            name: '#',
            field: 'index+1',
            filter: false,
        },
        {
            name: 'Name',
            field: 'name',
            filter: true,
        },
        {
        name: 'Description',
        field: 'description',
        filter: false,
        },
        {
            name: 'Abbreviation',
            field: 'abbr',
            filter: true,
        },
        {
            name: 'Status',
            field: 'status',
            filter: false,
        },
        {
            name: '     ',
            field: '',
            filter: false,
        }],
        content: [],
    };
    constructor(
        private _request: RequestService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog) { }
    ngOnInit() {
        this.createForm();
        this.GetMeetingTypes();
     }

    GetMeetingTypes() {
        const vm = this;
        if (this.searchForm.value.searchBy !== '' && this.searchForm.value.searchValue !== '') {
            this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
        }
        this._request.PostRequest('meetingtype/search/', {search: this.searchData}, function(res: ICredentials) {
            vm.searchData = {};
            if (res.code === '00') {
                vm.data.content = res.data;
            } else {
                alert(res.message);
            }
        });

    }
    AddMeetingType() {
        this.dialog.open(AddMeetingTypeDialogComponent, {});
    }
    private createForm() {
        this.searchForm = this.formBuilder.group({
        searchBy: [''],
        searchValue: [''],
        });
      }
}
