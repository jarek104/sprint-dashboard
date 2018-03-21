import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

@NgModule({
  exports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
})
export class SharedModule {}
