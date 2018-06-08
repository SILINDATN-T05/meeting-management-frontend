import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { RequestService } from '../../shared/services/request.service';
import { AddMeetingDialogComponent } from '../components/add-meeting-dialog/add-meeting-dialog.component';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
    animations: [routerTransition()],
})
export class MeetingsComponent implements OnInit {
    searchForm: FormGroup;
    searchData: object = {};
    data = {
        column: [{
            name: '#',
            field: 'index+1',
            filter: false,
        },
        {
            name: 'Meeting Name',
            field: 'meeting_name',
            filter: true,
        },
        {
            name: 'Meeting Type',
            field: 'meeting_type',
            filter: true,
        },
        {
        name: 'Meeting Items',
        field: 'meeting_item',
        filter: false,
        },
        {
            name: 'Meting Date',
            field: 'meeting_date',
            filter: false,
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
        private dialog: MatDialog,
        private dialogService: DialogService) { }
    ngOnInit() {
        this.createForm();
        this.GetMeetings();
     }

    GetMeetings() {
        const vm = this;
        if (this.searchForm.value.searchBy !== '' && this.searchForm.value.searchValue !== '') {
            this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
        }
        this._request.PostRequest('meeting/search/', {search: this.searchData}, function(res: ICredentials) {
            vm.searchData = {};
            if (res.code === '00') {
                vm.data.content = res.data;
            } else {
                alert(res.message);
            }
        });

    }
    AddMeeting() {
        this.dialog.open(AddMeetingDialogComponent, {});
    }
    private createForm() {
        this.searchForm = this.formBuilder.group({
        searchBy: [''],
        searchValue: [''],
        });
      }
}
