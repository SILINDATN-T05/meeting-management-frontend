import { Component, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS} from '@angular/material';
import { RequestService } from "../../../shared/services/request.service";
import { Credentials } from '../../../core/authentication/authentication.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import * as _ from "lodash";
@Component({ 
  selector: 'app-add_user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMeetingTypeComponent extends DialogComponent<{title:string, message:string},{}> {
    user:any = {};
    Roles:any = [];
    isSelectedBranch:boolean = false;
    isRoleSelected:boolean = false;
    isCompleted:boolean = false;
    selectedRoles:any = [];
    user_details:any = {};
    Branches:any = [];
    selectedBranch:any = {};
    searchForm: FormGroup;
  constructor(dialogService: DialogService,private formBuilder: FormBuilder, private request:RequestService) {
    super(dialogService);        
    this.createForm();
  }
  parseData(data){
    this.user = JSON.parse(data);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
  onSubmit(){
    var vm = this;
    this.request.PostRequest('meetingtype/create', this.searchForm.value, function(res:Credentials){
      console.log(res);
      if(res.code==='00'){
          alert('user created successfully');
      }else{
        alert(res.message);
      }
    })
    this.isCompleted = true;
    console.log(this.user_details);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    abbr:['', Validators.required]
    });
  }
}


// branch:"59f300cd8a80ed1980a4e19b"
// firstName:"Thulani"
// lastName:"Silinda"
// msisdn:"27798308985"
// roles:["57d681a9c23f062a7c4d5a00"]
// username:"27798308985"