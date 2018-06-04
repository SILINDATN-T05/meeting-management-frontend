import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessmentLogs } from '../../shared/interfaces/assessment.logs.interface';
import { IAuthoriseRequest } from '../../shared/interfaces/authorization_request.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';

@Component({
  selector: 'app-authorise-logs',
  templateUrl: './authorise-logs.component.html',
  styleUrls: ['./authorise-logs.component.scss'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
        state('expanded', style({ height: '*', visibility: 'visible' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
      routerTransition(),
    ],
})
export class AuthoriseLogsComponent implements OnInit {
  searchForm: FormGroup;
  searchData: object = {};
  isLoading = false;
  user: IUser;
  displayUser: IUser;
  data = {
      column: [
          {
              name: 'Assessment ID',
              field: 'ASSESSMENT_ID',
              filter: false,
          },
          {
              name: 'Assessment Created',
              field: 'REQUEST_CREATED',
              filter: false,
          },
          {
              name: 'Response Code',
              field: 'response_code',
              filter: true,
          },
          {
              name: 'Platform',
              field: 'req_options.channel',
              filter: true,
          },
      ],
      columns: [
        'request_date',
        'handler_name',
        'req_options',
        'step_name',
      ],
      content: [],
      pager: {
          totalItems: 0,
          currentPage: 0,
          pageSize: 0,
          totalPages: 0,
          startPage: 0,
          endPage: 0,
          startIndex: 0,
          endIndex: 0,
          pages: [],
      },
      allContent: [],
  };
  length = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  Branches = [];
  dataSource = new MatTableDataSource<IAssessmentLogs>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['SupplierPartid', 'AssessmentNumber', 'VehicleBookInDate', 'code', 'message'];
  constructor(
      private _request: RequestService,
      private formBuilder: FormBuilder,
      private pagerService: PagerService,
      public toastr:  ToastrService,
      vcr: ViewContainerRef) {

  }
  ngOnInit() {
      this.createForm();
      this.dataSource = new MatTableDataSource<IAssessmentLogs>([]);
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.Branches = JSON.parse(sessionStorage.getItem('branches'));
   }
   displayCode(assessment_number, Messages, part_id) {
       const found = _.findIndex(Messages, {SupplierPartid: part_id});
       const found1 = _.findIndex(Messages, {AssessmentNumber: assessment_number});
       return found >= 0 ? Messages[found].code : found1 >= 0 ? Messages[found1].code : null;
   }
   displayMessage(assessment_number, Messages, part_id) {
       const found = _.findIndex(Messages, {SupplierPartid: part_id});
       const found1 = _.findIndex(Messages, {AssessmentNumber: assessment_number});
       return found >= 0 ? Messages[found].message : found1 >= 0 ? Messages[found1].message : null;
   }
   isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');
   // tslint:disable-next-line:member-ordering
    expandedElement: any;
    matchedDataSource(log_data) {
        const parts = JSON.parse(log_data.parts);
        return new MatTableDataSource<IAuthoriseRequest>(parts);
    }
  GetNotification() {
      const vm = this;
      vm.isLoading = true;
      if (this.searchForm.value.searchBy !== '' && this.searchForm.value.searchValue !== '') {
          this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
      }
      this.searchData['request_date'] = {$lte: moment(vm.searchForm.value.toDate).endOf('day').toISOString(), $gte: moment(vm.searchForm.value.fromDate).startOf('day').toISOString()};
      this.searchData['req_options.action'] = 'authorise-many';
      this.searchData['step_name'] = 'AUDATEX-AUTHORISE-CLAIM';
      const options = {
          query: this.searchData,
      };
      this._request.PostRequest('api/count/list_all', options, function(res: ICredentials) {
          vm.searchData = {};
          if (res.code === '00') {
            vm.dataSource.data = res.data;
            vm.paginator.length = res.data.length;
            vm.paginator.pageIndex = 0;
            vm.paginator.pageSize = 5;
        } else {
            vm.toastr.warning('No Pending assessments(s) found', 'NOTE');
            vm.paginator.length = 0;
            vm.paginator.pageIndex = 0;
            vm.paginator.pageSize = 5;
        }
          vm.isLoading = false;
      });

  }
  private createForm() {
      this.searchForm = this.formBuilder.group({
      searchBy: [''],
      searchValue: [''],
      fromDate: [ new Date()],
      toDate: [ new Date()],
      });
    }

}
