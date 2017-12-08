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
export class AddUserComponent extends DialogComponent<{title:string, message:string},{}> {
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
  onStep1Next(event){
    var vm = this;
    console.log(this.searchForm.invalid);
    vm.user_details = this.searchForm.value;
    vm.user_details.msisdn = vm.user_details.msisdn.toString();
    vm.user_details.msisdn = vm.user_details.msisdn.length===9?'27'+vm.user_details.msisdn:vm.user_details.msisdn.length===10?'27'+vm.user_details.msisdn.substring(1, 9):vm.user_details.msisdn;
    this.searchForm.invalid
    this.request.PostRequest('role/list_all', {}, function(res:Credentials){
      console.log(res);
      if(res.code==='00'){
          vm.Roles = res.data;
      }
  })
  }
  onStep2Next(event){
///branch/list_all
    var vm = this;
    this.request.PostRequest('branch/list_all', {}, function(res:Credentials){
      console.log(res);
      if(res.code==='00'){
        vm.Branches = res.data;
    }
    })
  }
  onStep3Next(event){
    this.isCompleted = false;
  }
  selectBranch(event, branch, state){
    if(state){
      this.selectedBranch = branch;
      this.isSelectedBranch = true;
    }else{
      this.selectedBranch = {};
      this.isSelectedBranch = false;
    }
  }
  selectRole(event, role, state){
    var found = _.findIndex(this.selectedRoles, {_id:role._id});
    if(state && found ===-1){
      this.selectedRoles.push(role);
      this.isRoleSelected = true;
    }else{
      _.pullAt(this.selectedRoles, [found]);
      if(this.selectedRoles.length>0){
        this.isRoleSelected = true;
      }else{
        this.isRoleSelected = false;
      }
      // this.selectedRoles.pop(found);
    }
  }
  onComplete(event){
    this.user_details['branch'] = this.selectedBranch._id;
    this.user_details['roles'] = [];
    this.selectedRoles.forEach(element => {
      this.user_details.roles.push(element._id);
    });
    var vm = this;
    this.request.PostRequest('user/process_user', this.user_details, function(res:Credentials){
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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    msisdn: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required]
    });
  }
}


// branch:"59f300cd8a80ed1980a4e19b"
// firstName:"Thulani"
// lastName:"Silinda"
// msisdn:"27798308985"
// roles:["57d681a9c23f062a7c4d5a00"]
// username:"27798308985"