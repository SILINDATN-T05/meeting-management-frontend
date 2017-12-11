import { Component, OnInit, NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RequestService } from "../../shared/services/request.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../core/authentication/authentication.service';

import { DialogService } from "ng2-bootstrap-modal";
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { AddMeetingComponent } from "./add/add.component";

@NgModule({
    entryComponents:[AddMeetingComponent]
}) 

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
    animations: [routerTransition()]
})
export class MeetingsComponent implements OnInit {
    searchForm: FormGroup;
    searchData:Object = {};
    data = {
        column:[{
            name:'#',
            field:'index+1',
            filter:false
        },
        {
            name:'Meeting Name',
            field:'meeting_name',
            filter:true
        },
        {
            name:'Meeting Type',
            field:'meeting_type',
            filter:true
        },
        {
        name:'Meeting Items',
        field:'meeting_item',
        filter:false
        },
        {
            name:'Meting Date',
            field:'meeting_date',
            filter:false
        },
        {
            name:'Status',
            field:'status',
            filter:false
        },
        {
            name:'     ',
            field:'',
            filter:false
        }],
        content:[]
    }
    constructor(
        private _request:RequestService,
        private formBuilder: FormBuilder,
        private dialogService:DialogService) { }
    ngOnInit() {
        this.createForm();
        this.GetMeetings();
     }

    GetMeetings(){
        let vm = this;
        if(this.searchForm.value.searchBy!='' && this.searchForm.value.searchValue != ''){
            this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
        }
        this._request.PostRequest('meeting/search/', {search:this.searchData}, function(res:Credentials){
            vm.searchData = {};
            if(res.code==='00'){
                vm.data.content = res.data;
            }else{
                alert(res.message);
            }
        })

    }
    AddMeeting(){
        let disposable = this.dialogService.addDialog(AddMeetingComponent, {
            title:'Add New Meeting', 
            message:'Cupture Information'})
            .subscribe((isConfirmed)=>{
                //We get dialog result
                if(isConfirmed) {
                    alert('accepted');
                }
                else {
                    alert('declined');
                }
            });
    }
    private createForm() {
        this.searchForm = this.formBuilder.group({
        searchBy: [''],
        searchValue: ['']
        });
      }
}
