import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { routerTransition } from '../../../router.animations';
import { IAdditional } from '../../../shared/interfaces/additional.interface';
import { IAssessment } from '../../../shared/interfaces/assessment.interface';
import { IAudaPart } from '../../../shared/interfaces/auda_part.interface';
import { IMatchedPart } from '../../../shared/interfaces/matched_part.interface';
import { IMBRWORKPROVIDER } from '../../../shared/interfaces/mbr.workprovider.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';
import { CancelAssessmentDialogComponent } from '../../components/cancel-assessment-dialog/cancel-assessment-dialog.component';
import { ImageSliderDialogComponent } from '../../components/image-slider-dialog/image-slider-dialog.component';
import { PdfDisplayComponent } from '../../components/pdf-display/pdf-display.component';
import { VerificationDialogComponent } from '../../components/verification-dialog/verification-dialog.component';

@Component({
  selector: 'app-confirm-matched',
  templateUrl: './confirm-matched.component.html',
  styleUrls: ['./confirm-matched.component.scss'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
        state('expanded', style({ height: '*', visibility: 'visible' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
      routerTransition()],
})
export class ConfirmMatchedComponent implements OnInit {
    selectedAssessment: IAssessment;
    request_part_status = [];
    part_standard = [];
    pdfAttachment = '';
    user: IUser;
    imageAttachments = [];
    comments = null;
    isLoading = false;
    MBRWORKPROVIDER: IMBRWORKPROVIDER;
    MBRWORKPROVIDER_Template = {
        _id: '',
        MBR_NAME: '',
        WORKPROVIDER_ARRAY: [],
    };
    isFilesLoading = false;
    matched_price = 0;
    oe_price = 0;
    matched_price_show = '0';
    oe_price_show = '0';
    saved_amount = '0';
    requestAdditional: IAdditional;
    requestAddTemplate = {
        CREATE_DATE: '',
        REQUEST_ID: '',
        VEHICLE_MAKE: '',
        MODELYEAR: '',
        REG_MONTH: '',
        REG_YEAR: '',
        ODOMETER: '',
        COLOUR: '',
        PAINTCODE: '',
        MODELSPEC: '',
        CREATORSITEID: '',
        AUDAUPDATEDBY: '',
        AUDAVERSION: '',
        SUBMITTEDBY: '',
        DATEOFACCIDENT: '',
        ASSESSOR_NAME: '',
        ASSESSOR_ADDRESS: '',
        };
    data = {
        column: [
            {
                name: 'Date',
                field: 'CREATE_DATE',
                filter: true,
            },
            {
                name: 'Part  Status',
                field: 'PART_STATUS_ID',
                filter: false,
            },
            {
                name: 'Part ID',
                field: 'AUDA_PART_ID',
                filter: false,
            },
            {
                name: 'Part Part OE',
                field: 'AUDA_PART_OE',
                filter: false,
            },
            {
                name: 'Part Guid',
                field: 'AUDA_GUID',
                filter: true,
            },
            {
                name: 'Part Description',
                field: 'AUDA_DESCRIPTION',
                filter: false,
            },
            {
                name: 'Part Price',
                field: 'OE_PRICE',
                filter: false,
            },
            {
                name: 'Accept',
                field: 'checked',
                filter: false,
            },
        ],
        columns: [
            'PART_STATUS_ID',
            'AUDA_PART_OE',
            'AUDA_GUID',
            'AUDA_DESCRIPTION',
            'OE_PRICE',
        ],
        content: [],
    };
    submit_parts = [];
    selected_parts = [];
    Branches = [];
    isMatchMBR = false;
    isMatchWorkProvider = false;
    displayedColumns = ['MATCHED_PART', 'PART_DESCRIPTION', 'PART_STANDARD', 'MATCHED_PRICE', 'select'];
    selection = new SelectionModel<IMatchedPart>(true, []);
    // dataSource = new MatTableDataSource<IAudaPart>(this.data.content);
    dataSource = new MatTableDataSource<IAudaPart>([]);

    isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');
    // tslint:disable-next-line:member-ordering
    expandedElement: any;

    constructor(
        private _request: RequestService,
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
        private router: Router,
        private dialog: MatDialog) {
         }

    ngOnInit() {
        this.requestAdditional =  this.requestAddTemplate;
        this.dataSource = new MatTableDataSource<IAudaPart>([]);
        this.MBRWORKPROVIDER = this.MBRWORKPROVIDER_Template;
        this.selectedAssessment = JSON.parse(sessionStorage.getItem('selectedAssessment'));
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.request_part_status = JSON.parse(sessionStorage.getItem('request_part_status'));
        this.part_standard = JSON.parse(sessionStorage.getItem('standard'));
        this.getBranches();
        this.getRequestAdditional();
        this.getRequestParts();
        this.getEmailAttachments();
        this.checkSuccess();
    }
    matchedDataSource(matched) {
        return new MatTableDataSource<IMatchedPart>(matched);
    }
    checkSuccess() {
        this.isMatchMBR = _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
            return o === 3;
        }) < 0;
        this.isMatchWorkProvider = _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
            return o === 1;
        }) < 0;
        if (!this.isMatchMBR) {
            this.getMBRWORKPROVIDER();
        }
    }
    processMatch() {
        const dialogRef = this.dialog.open(VerificationDialogComponent, {});
        dialogRef.afterClosed().subscribe((result) => {
            this.selectedAssessment = JSON.parse(sessionStorage.getItem('selectedAssessment'));
            this.checkSuccess();
          });
    }
    cancelAssessment() {
        const dialogRef = this.dialog.open(CancelAssessmentDialogComponent, {});
    }

  getBranches() {
    const vm = this;
    try {
    vm.Branches = JSON.parse(sessionStorage.getItem('branches'));
    if (vm.Branches.length === 0) {
      this._request.PostRequest('api/branch/list_all', {}, function(res: ICredentials) {
        if (res.code === '00') {
          vm.Branches = res.data;
        }
      });
     }
    } catch (e) {
      // console.log(e.message);
      this._request.PostRequest('api/branch/list_all', {}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Branches = res.data;
      }
    });
    }
  }
  displayBranch(branch) {
    const found = _.findIndex(this.Branches, {_id: branch});
    return found > 0 ? this.Branches[found].NAME : null;
  }
    getRequestParts() {
        const vm = this;
        vm.dataSource.data = [];
        if (vm.selectedAssessment.REQUEST_ID) {
        const options = {
            query: {REQUEST_ID: vm.selectedAssessment.REQUEST_ID},
        };
        vm._request.PostRequest('api/assessment/unverified_parts/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data) {
                vm.dataSource.data = res.data;
                // vm.dataSource = new MatTableDataSource<IAudaPart>(vm.data.content);
                // vm.requestMatchedParts = res.data.MATCHED_PARTS;
            } else {
                vm.toastr.warning('No part found', 'NOTE');
                vm.dataSource.data = [];
            }
        });
        } else {
        vm.toastr.warning('No selected assessment found', 'NOTE');
        }

    }
    getRequestAdditional() {
        const vm = this;
        vm.requestAdditional = vm.requestAddTemplate;
        if (vm.selectedAssessment.REQUEST_ID) {
        const options = {
            query: {REQUEST_ID: vm.selectedAssessment.REQUEST_ID},
        };
        vm._request.PostRequest('api/assessment/unverified_additional/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data) {
                vm.requestAdditional = res.data;
            } else {
                vm.toastr.warning('No additional information found', 'NOTE');
            }
        });
        } else {
        vm.toastr.warning('No selected assessment found', 'NOTE');
        }
    }
    getMBRWORKPROVIDER() {
        const vm = this;
        if (vm.selectedAssessment.REQUEST_ID) {
        const options = {
            query: { WORKPROVIDER_ARRAY: { $in: [vm.selectedAssessment.WORKPROVIDER_ABBR + '_' + vm.selectedAssessment.MBR_ID] }},
        };
        vm._request.PostRequest('api/mbr/work_provider_list/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data) {
                vm.MBRWORKPROVIDER = res.data[0];
            } else {
                vm.toastr.warning('No mbr/work provider information found', 'NOTE');
            }
        });
        } else {
        vm.toastr.warning('No selected assessment found', 'NOTE');
        }
    }
    displayMBRWORKPROVIDER(id) {
        if (this.MBRWORKPROVIDER.WORKPROVIDER_ARRAY.length > 0) {
            const index = _.indexOf(this.MBRWORKPROVIDER.WORKPROVIDER_ARRAY, this.selectedAssessment.WORKPROVIDER_ABBR + '_' + id);
            return index >= 0 ? this.MBRWORKPROVIDER.MBR_NAME : id;
        } else {
            return null;
        }
    }
    assessmentPdf() {
            sessionStorage.setItem('pdfAttachment', this.pdfAttachment);
            this.dialog.open(PdfDisplayComponent, {});
        }

    getEmailAttachments() {
            const vm = this;
            vm.isFilesLoading = true;
            vm.pdfAttachment = null;
            vm.imageAttachments = [];
            vm._request.PostRequest('attachment/fetch_attachments', {messageId: vm.selectedAssessment.MESSAGE_ID}, function(response: ICredentials) {
                if (response.code === '00' && response.data) {
                        vm.pdfAttachment = response.data.pdf;
                        vm.imageAttachments = response.data.images;
                        vm.isFilesLoading = false;
                } else {
                    vm.toastr.warning('No email attachments found', 'NOTE');
                }
            });
            // vm._request.apiData$.subscribe( function(response: ICredentials) {
            //     if (response.code === '00' && response.data) {
            //             vm.pdfAttachment = response.data.pdf;
            //             vm.imageAttachments = response.data.images;
            //             vm.isFilesLoading = false;
            //     } else {
            //         vm.toastr.warning('No email attachments found', 'NOTE');
            //     }
            // });

            // const options = {
            //     query: { ASSESSMENT_ID: vm.selectedAssessment.ASSESSMENT_ID },
            // };
            // // vm._request.PostRequest('api/attachment/fetch_attachments', options, function(res: ICredentials) {
            // //         if (res.code === '00' && res.data) {
            // vm._request.PostRequest('attachment/fetch_attachments', {messageId: vm.selectedAssessment.MESSAGE_ID}, function(response: ICredentials) {
            //                 if (response.code === '00' && response.data) {
            //                         vm.pdfAttachment = response.data.pdf;
            //                         vm.imageAttachments = response.data.images;
            //                         vm.isFilesLoading = false;
            //                 } else {
            //                     vm.toastr.warning('No email attachments found', 'NOTE');
            //                 }
            //             });
            //     //     } else {
            //     //         vm.toastr.warning('No email attachments found', 'NOTE');
            //     //     }
            //     // });
    }

        prepareImageSlider() {
            sessionStorage.setItem('imageAttachments', JSON.stringify(this.imageAttachments));
            this.dialog.open(ImageSliderDialogComponent, {});
        }

    displayPartStandard(standard_id) {
        if (this.part_standard.length > 0) {
            const index = _.findIndex(this.part_standard, { ID: standard_id });
            return index >= 0 ? this.part_standard[index].PART_STANDARD : null;
        } else {
            return null;
        }
    }

    displayPartStatus(part_status_id) {
        if (this.request_part_status.length > 0) {
            const index = _.findIndex(this.request_part_status, { PART_STATUS_ID: part_status_id });
            return index >= 0 ? this.request_part_status[index].PART_STATUS : null;
        } else {
            return null;
        }
    }
    countPrice() {
        // console.log(this.selected_parts, this.submit_parts);
        this.oe_price = 0;
        this.matched_price = 0;
        this.selected_parts.forEach( (element, i) => {
            this.matched_price += element.MATCHED_PRICE;
            // console.log(this.matched_price);
        });
        this.submit_parts.forEach( (element, i) => {
            this.oe_price += element.PRICE;
        });
        this.matched_price_show = this.matched_price.toFixed(2);
        this.oe_price_show = this.oe_price.toFixed(2);
        this.saved_amount = (this.oe_price - this.matched_price).toFixed(2);
    }
    priceChange(matched, auda_part) {
        // console.log(matched, auda_part);
        // console.log(this.selection);
        const index = _.findIndex(this.submit_parts, { AUDA_PART_OE: auda_part.AUDA_PART_OE });
        if (index >= 0) {
            const found = _.findIndex(this.selection.selected, {_id: this.submit_parts[index].ID});
            const foundPart = this.selection.selected[found];
            if (found >= 0) {
                if (this.selection.isSelected(foundPart)) {
                    this.selection.deselect(foundPart);
                    this.selected_parts.splice(_.findIndex(this.selected_parts, {_id: foundPart._id}), 1);
                }
                this.submit_parts[index].ID = matched._id;
                this.selected_parts.push(matched);
            } else {
                this.selected_parts.splice(_.findIndex(this.selected_parts, {_id: this.submit_parts[index].ID}), 1);
                this.submit_parts.splice(index, 1);
            }
        } else {
            const found = _.findIndex(this.selection.selected, {_id: matched._id});
            this.selected_parts.push(matched);
            this.submit_parts.push({ID: matched._id, AUDA_PART_OE: auda_part.AUDA_PART_OE, PRICE: auda_part.OE_PRICE});
        }
        // this.selected_parts = this.selection.selected;
        this.countPrice();
    }
    getPrice(matched) {
        const vm = this;
        vm.selection = new SelectionModel<IMatchedPart>(true, []);
        vm.selected_parts = [];
        vm.submit_parts = [];
        vm.matched_price_show = '0';
        vm.oe_price_show = '0';
        vm.saved_amount = '0';
        const options = {
            matched_part: matched.MATCHED_PART,
            manufacturer: vm.requestAdditional.VEHICLE_MAKE,
            part_standard: matched.PART_STANDARD,
            mbrName: vm.MBRWORKPROVIDER.MBR_NAME,
            id: matched._id,
        };
        vm._request.PostRequest('api/assessment/get_price', options, function(res: ICredentials) {
                vm.selection = new SelectionModel<IMatchedPart>(true, []);
                vm.selected_parts = [];
                vm.submit_parts = [];
                if (res.code === '00' && res.data) {
                    vm.getRequestParts();
                } else {
                    vm.toastr.warning('No price found', 'NOTE');
                }
            });
    }
    goToVerification() {
        this.router.navigate(['/verification'], { replaceUrl: true });
    }

    submitBids() {
        const vm = this;
        vm.isLoading = true;
        const options = {
            parts: JSON.stringify(vm.selection.selected).replace(/"/g, '\\"'),
            assessmentNumber: vm.selectedAssessment.ASSESSMENT_ID + '_' + vm.selectedAssessment.ORIGINATOR.substring(0, vm.selectedAssessment.ORIGINATOR.search('/')),
            trans_type: 'SUBMIT-BIDS',
        };
        this._request.PostRequest('api/transaction/', options, function(res: ICredentials) {
            if (res.code === '00') {
                vm.toastr.success('Bids submited successfully', 'NOTE',   {
                    timeOut: 3000,
                  });
                vm.router.navigate(['/verification'], { replaceUrl: true });
            } else {
                vm.toastr.error(res.message, 'ERROR');
            }
            vm.isLoading = false;
        });

    }

}