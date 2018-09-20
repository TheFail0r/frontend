import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberViewComponent } from './member-view.component';

import { MatDividerModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { MemberService } from './../services/member.service';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule
  ],
  declarations: [
    MemberViewComponent
  ],
  exports: [
    MemberViewComponent
  ],
  providers: [
    MemberService
  ]
})
export class MemberViewModule { }
