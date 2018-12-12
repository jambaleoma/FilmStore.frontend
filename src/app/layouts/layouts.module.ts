import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LayoutsComponent } from './admin/layouts.component';
import {SplitButtonModule} from 'primeng/splitbutton';

@NgModule({
  imports: [
    SplitButtonModule,
    MenubarModule,
    CommonModule,
    ButtonModule
  ],
  exports: [
    LayoutsComponent
  ],
  declarations: [
    LayoutsComponent
  ],
  providers: [
  ],
})
export class SdcLayoutsModule {}
