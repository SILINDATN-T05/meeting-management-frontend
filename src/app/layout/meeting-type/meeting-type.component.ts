import { Component, OnInit, NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RequestService } from "../../shared/services/request.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../core/authentication/authentication.service';

import { DialogService } from "ng2-bootstrap-modal";
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { AddMeetingTypeComponent } from "./add/add.component";

@NgModule({
    entryComponents:[AddMeetingTypeComponent]
})

@Component({
    selector: 'app-meeting-type',
    templateUrl: './meeting-type.component.html',
    styleUrls: ['./meeting-type.component.scss'],
    animations: [routerTransition()]
})
export class MeetingTypesComponent implements OnInit {
    searchForm: FormGroup;
    searchData:Object = {};
    data = {
        column:[{
            name:'#',
            field:'index+1',
            filter:false
        },
        {
            name:'Name',
            field:'name',
            filter:true
        },
        {
        name:'Description',
        field:'description',
        filter:false
        },
        {
            name:'Abbreviation',
            field:'abbr',
            filter:true
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
        this.GetMeetingTypes();
     }

    GetMeetingTypes(){
        let vm = this;
        if(this.searchForm.value.searchBy!='' && this.searchForm.value.searchValue != ''){
            this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
        }
        this._request.PostRequest('meetingtype/search/', {search:this.searchData}, function(res:Credentials){
            vm.searchData = {};
            if(res.code==='00'){
                vm.data.content = res.data;
            }else{
                alert(res.message);
            }
        })

    }
    AddMeetingType(){
        let disposable = this.dialogService.addDialog(AddMeetingTypeComponent, {
            title:'Add New MeetingType', 
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
