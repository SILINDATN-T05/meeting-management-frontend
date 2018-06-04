import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkDetailRowRenderDirective } from './cdk-detail-row-render.directive';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ CdkDetailRowDirective, CdkDetailRowRenderDirective ],
 exports:      [ CdkDetailRowDirective, CdkDetailRowRenderDirective ],
})
export class CdkDetailRowModule {}
