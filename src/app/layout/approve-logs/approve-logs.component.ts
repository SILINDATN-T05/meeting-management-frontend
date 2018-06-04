import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessmentLogs } from '../../shared/interfaces/assessment.logs.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';

@Component({
  selector: 'app-approve-logs',
  templateUrl: './approve-logs.component.html',
  styleUrls: ['./approve-logs.component.scss'],
  animations: [routerTransition()],
})
export class ApproveLogsComponent implements OnInit {
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
        'response_code',
        'message',
        'PartId',
        'Accepted',
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
  dataSource = new MatTableDataSource<IAssessmentLogs>(this.data.content);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
      private _request: RequestService,
      private formBuilder: FormBuilder,
      private pagerService: PagerService,
      public toastr:  ToastrService,
      vcr: ViewContainerRef) {

  }
  ngOnInit() {
      this.createForm();
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.Branches = JSON.parse(sessionStorage.getItem('branches'));
   }

  setPageSize(page: number, size: number) {

      // get pager object from service
      this.data.pager = this.pagerService.getPager(this.data.allContent.length, page, size);
      // get current page of items
      this.data.content = this.data.allContent.slice(this.data.pager.startIndex, this.data.pager.endIndex + 1);
      this.dataSource = new MatTableDataSource<IAssessmentLogs>(this.data.content);
  }
  paginationEvent(event: PageEvent) {
      this.setPageSize(event.pageIndex + 1, event.pageSize);
  }
  GetNotification() {
      const vm = this;
      vm.isLoading = true;
      if (this.searchForm.value.searchBy !== '' && this.searchForm.value.searchValue !== '') {
          this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
      }
      this.searchData['request_date'] = {$lte: moment(vm.searchForm.value.toDate).endOf('day').toISOString(), $gte: moment(vm.searchForm.value.fromDate).startOf('day').toISOString()};
      this.searchData['req_options.action'] = 'authorise';
      this.searchData['step_name'] = 'AUDATEX-AUTHORISE-CLAIM';
      const options = {
          query: this.searchData,
      };
      this._request.PostRequest('api/count/list_all', options, function(res: ICredentials) {
          vm.searchData = {};
          if (res.code === '00') {
              vm.data.allContent = res.data;
              vm.length = res.data.length;
              vm.setPageSize(1, 5);
          } else {
              vm.toastr.warning('No users found', 'NOTE');
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
