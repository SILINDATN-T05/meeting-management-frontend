import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-tooltip';
import { DemoMaterialModule } from '../shared/modules/materialModule';
import { ReissueRoutingModule } from './reissue-routing.module';
import { ReissueComponent } from './reissue.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    TooltipModule,
    ReissueRoutingModule,
    DemoMaterialModule,
  ],
  declarations: [
    ReissueComponent,
  ],
})
export class ReissueModule { }
