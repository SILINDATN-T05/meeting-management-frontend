import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../modules/materialModule';
import { FilterFormComponent } from './filter-form.component';

@NgModule({
 imports:      [
  CommonModule,
  DemoMaterialModule,
  ],
 declarations: [ FilterFormComponent ],
 exports:      [ FilterFormComponent ],
})
export class FilterFormModule {}
