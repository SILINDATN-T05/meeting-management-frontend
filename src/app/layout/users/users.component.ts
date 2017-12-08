import { Component, OnInit, NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RequestService } from "../../shared/services/request.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../core/authentication/authentication.service';

import { DialogService } from "ng2-bootstrap-modal";
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { AddUserComponent } from "./add/add.component";

@NgModule({
    entryComponents:[AddUserComponent]
})

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
    searchForm: FormGroup;
    searchData:Object = {};
    data = {
        column:[{
            name:'#',
            field:'index+1',
            filter:false
        },
        {
            name:'First Name',
            field:'firstName',
            filter:true
        },
        {
        name:'Last Name',
        field:'lastName',
        filter:true
        },
        {
            name:'Username',
            field:'username',
            filter:true
        },
        {
            name:'Branch',
            field:'branch.name',
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
     }

    GetUsers(){
        let vm = this;
        if(this.searchForm.value.searchBy!='' && this.searchForm.value.searchValue != ''){
            this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
        }
        let options = {
            query:JSON.stringify(this.searchData).replace(/"/g, "\\\""),
            action:'list_users',
            trans_type:'PORTALUSERS0001'
        }
        this._request.PostRequest('server/core/transaction/', options, function(res:Credentials){
            vm.searchData = {};
            if(res.code==='00'){
                vm.data.content = res.data['users'];
            }else{
                alert(res.message);
            }
        })

    }
    AddUser(){
        let disposable = this.dialogService.addDialog(AddUserComponent, {
            title:'Add New User', 
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
