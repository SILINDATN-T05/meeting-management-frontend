import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { LinkUnlinkPartComponent } from './link-unlink-part/link-unlink-part.component';
import { PartsManagementRoutingModule} from './parts-management-routing.module';
import { PartsManagementComponent } from './parts-management.component';


@NgModule({
    imports: [
        CommonModule,
        PartsManagementRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
    ],
    declarations: [
        PartsManagementComponent, LinkUnlinkPartComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export  class  PartsManagementModule { }
